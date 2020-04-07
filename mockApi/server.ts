import jsonServer from "json-server";
import data from "./mockData";
import * as renderHelpers from "./renderHelpers";
import { getScenariosApplicableToEndpoint } from "./renderHelpers";

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/users/me": "/user",
  })
);

// @ts-ignore
router.render = (req, res) => {
  const scenariosHeaderString = req.headers["scenarios"];
  const scenariosFromHeader = scenariosHeaderString
    ? scenariosHeaderString.split(" ")
    : [];
  const url = renderHelpers.removeTrailingSlashes(req.originalUrl);

  let customResponse = renderHelpers.getCustomReponse(url, scenariosFromHeader);

  if (customResponse) {
    res.status(customResponse.httpStatus).jsonp(customResponse.respone);
  } else {
    let data = res.locals.data;

    if (url === "/api/quotes" && req.method === "GET") {
      data = data.map(renderHelpers.toQuoteSummary);
    }

    if (scenariosHeaderString && Array.isArray(data) && data.length > 0) {
      const scenariosApplicableToEndPoint = getScenariosApplicableToEndpoint(
        url,
        scenariosFromHeader
      );

      const filteredByScenario = data.filter((d) =>
        scenariosApplicableToEndPoint.every(
          (scenario) => d.scenarios && d.scenarios.includes(scenario)
        )
      );
      res.jsonp(filteredByScenario);
    } else res.jsonp(data);
  }
};

server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running");
});
