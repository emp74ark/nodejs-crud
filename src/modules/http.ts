import { createServer } from 'node:http';
import { deleteRoutes } from '../routes/deleteRoutes.js';
import { getRoutes } from '../routes/getRoutes.js';
import { postRoutes } from '../routes/postRoutes.js';
import { putRoutes } from '../routes/putRoutes.js';
import { msgServerError, msgStartServer } from './messages.js';

export function startServer(address = '127.0.0.1', port = 3000, backlog = 64) {
  createServer((request, response) => {
    try {
      if (request.method === 'GET') {
        const { code, data } = getRoutes(request.url);
        response.statusCode = code;
        response.end(data);
      }
      if (request.method === 'PUT') {
        putRoutes(request, response);
      }
      if (request.method === 'POST') {
        postRoutes(request, response);
      }
      if (request.method === 'DELETE') {
        deleteRoutes(request, response);
      }
    } catch (err) {
      msgServerError(err)
      response.statusCode = 500;
      response.end('Server error');
    }
  }).listen(port, address, backlog, () => {
    msgStartServer(address, port);
  });
}
