const jsonServer = require('json-server');
const data = require('./mockData');
const responses = require('./responses');
const server = jsonServer.create();
const router = jsonServer.router(data);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/quotes': '/quotesSummary/',
  })
);

router.render = (req, res) => {
  // const customResponseHeader = req.headers['custom-response'];
  // const customResponses = customResponseHeader && customResponseHeader.split(' ');

  const scenariosHeader = req.headers['scenarios'];
  const scenarios = scenariosHeader ? scenariosHeader.split(' ') : [];
  
  let customResponse = null;
  if (scenarios.length > 0) {
    customResponse = responses.find(
      response => scenarios.includes(response.code) && response.urls.includes(req.originalUrl)
    );
  }

  if (customResponse) {
    res.status(customResponse.httpStatus).jsonp(customResponse.respone);
  } else {
    const data = res.locals.data;
    if (scenariosHeader && Array.isArray(data) && data.length > 0) {
      const filteredByScenario = data.filter(d =>
        scenarios.every(scenario => d.scenarios.includes(scenario))
      );
      res.jsonp(filteredByScenario);
    } else res.jsonp(data);
  }
};

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
