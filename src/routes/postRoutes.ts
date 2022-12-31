import { IncomingMessage, ServerResponse } from 'http';
import { addNew } from '../controller/user.controller.js';
import { bodyChecker } from '../modules/helpers/bodyChecker.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';

export function postRoutes(request: IncomingMessage, response: ServerResponse) {
  if (urlSlashChecker(request.url) === '/api/users/') {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const body = Buffer.from(buffer);
      if (bodyChecker(body)) {
        addNew(body);
        response.statusCode = 201;
        response.end(body);
      } else {
        response.statusCode = 400;
        response.end('Body does not contain required fields');
      }
    });
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
}
