import { IncomingMessage, ServerResponse } from 'http';
import { deleteById } from '../controller/user.controller.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';

export function deleteRoutes(request: IncomingMessage, response: ServerResponse) {
  // TODO: check for valid UID (400)
  if (urlSlashChecker(request.url)?.match(/\/api\/users\/\d/)?.input) {
    deleteById(request.url);
    response.statusCode = 204;
    response.end();
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
}
