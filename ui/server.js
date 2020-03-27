const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mockdata/db.json');

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1', 
  })
);

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running');
});
