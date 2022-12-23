import { IncomingMessage, ServerResponse } from 'http';
import { updateById } from '../controller/user.controller.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';

export function putRoutes(request: IncomingMessage, response: ServerResponse) {
  // TODO: check for valid UID (400)
  if (urlSlashChecker(request.url)?.match(/\/api\/users\/\d/)?.input) {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const body = Buffer.from(buffer);
      updateById(request.url, body);
      response.statusCode = 200;
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
}
