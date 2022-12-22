import { IncomingMessage } from 'http';

interface Route {
  code: number;
  data: string;
}

function urlSlashChecker(url: string | undefined) {
  if (url === undefined) {
    return;
  } else if (url[url.length - 1] !== '/') {
    return url + '/';
  }
  return url;
}

export function serverRouter(url: IncomingMessage['url']) {
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
      route.data = 'users';
      break;
    case urlSlashChecker(url)?.match(/\/api\/users\/\d/)?.input:
      route.code = 200;
      route.data = 'user';
      break;
    default:
      route.code = 404;
      route.data = 'Not found';
      break;
  }

  return route;
}
