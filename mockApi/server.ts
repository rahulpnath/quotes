import jsonServer from 'json-server';
import data from './mockData';
import * as renderHelpers from './renderHelpers';

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// @ts-ignore
router.render = (req, res) => {
  const scenariosHeader = req.headers['scenarios'];
  const scenarios = scenariosHeader ? scenariosHeader.split(' ') : [];
  const url = renderHelpers.removeTrailingSlashes(req.originalUrl);

  let customResponse = renderHelpers.getCustomReponse(url, scenarios);

  if (customResponse) {
    res.status(customResponse.httpStatus).jsonp(customResponse.respone);
  } else {
    let data = res.locals.data;

    if (url === '/api/quotes' && req.method === 'GET') {
      data = data.map(renderHelpers.toQuoteSummary);
    }
    if (scenariosHeader && Array.isArray(data) && data.length > 0) {
      const filteredByScenario = data.filter((d) =>
        scenarios.every((scenario) => d.scenarios && d.scenarios.includes(scenario))
      );
      res.jsonp(filteredByScenario);
    } else res.jsonp(data);
  }
};

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
