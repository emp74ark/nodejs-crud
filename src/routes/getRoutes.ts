import { IncomingMessage } from 'http';
import { getAll, getById } from '../controller/user.controller.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';
import { Route } from '../interfaces.js';

export function getRoutes(url: IncomingMessage['url']) {
  const route: Route = {
    code: 404,
    data: 'error',
  };

  switch (urlSlashChecker(url)) {
    case '/':
      route.code = 200;
      route.data = `API address is ${process.env.HOST}:${process.env.PORT}/api`;
      break;
    case '/api/':
      route.code = 200;
      route.data = 'api';
      break;
    case '/api/users/':
      route.code = 200;
      route.data = getAll();
      break;
    case urlSlashChecker(url)?.match(/\/api\/users\/\d/)?.input:
      route.code = getById(url).code;
      route.data = getById(url).data;
      break;
    default:
      route.code = 404;
      route.data = 'Page not found';
      break;
  }

  return route;
}
