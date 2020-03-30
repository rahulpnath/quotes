const jsonServer = require('json-server');
const data = require('./mockData');
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
  const scenariosHeader = req.headers['scenarios'];
  const scenarios = scenariosHeader ? scenariosHeader.split(' ') : [];
  const data = res.locals.data;
  if (scenariosHeader && Array.isArray(data) && data.length > 0) {
    const filteredByScenario = data.filter(d =>
      scenarios.every(scenario => d.scenarios.includes(scenario))
    );
    res.jsonp(filteredByScenario);
  } else res.jsonp(data);
};

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
