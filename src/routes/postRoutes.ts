import { IncomingMessage, ServerResponse } from 'http';
import { addNew } from '../controller/user.controller.js';
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
      addNew(body);
      response.statusCode = 201;
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end('Not found1');
  }
}
