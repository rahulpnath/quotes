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

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
