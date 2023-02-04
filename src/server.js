import http from 'node:http'
import { json } from './middlewares/json.js';
import { extractQueryParams } from './utils/extractQueryParams.js';
import { routes } from './router.js';

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const actualRoute = routes.find(route => route.method === req.method && route.path.test(req.url))

  if(actualRoute) {
    const routeParams = req.url.match(actualRoute.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return actualRoute.handler(req, res)
  }

  return res.end(JSON.stringify(req.body))
})

server.listen(3333)