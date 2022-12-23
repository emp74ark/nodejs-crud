import { IncomingMessage, ServerResponse } from 'http';
import { deleteById, getById } from '../controller/user.controller.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';

export function deleteRoutes(request: IncomingMessage, response: ServerResponse) {
  if (urlSlashChecker(request.url)?.match(/\/api\/users\/\d/)?.input) {
    const { code, data } = getById(request.url);
    if (code === 200) {
      deleteById(request.url);
      response.statusCode = 204;
      response.end();
    } else {
      response.statusCode = code;
      response.end(data);
    }
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
}
