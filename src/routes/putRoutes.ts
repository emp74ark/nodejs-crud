import { IncomingMessage, ServerResponse } from 'http';
import { getById, updateById } from '../controller/user.controller.js';
import { urlSlashChecker } from '../modules/helpers/urlSlashChecker.js';

export function putRoutes(request: IncomingMessage, response: ServerResponse) {
  if (urlSlashChecker(request.url)?.match(/\/api\/users\/\d/)?.input) {
    const { code, data } = getById(request.url);
    if (code === 200) {
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
      response.statusCode = code;
      response.end(data);
    }
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
}
