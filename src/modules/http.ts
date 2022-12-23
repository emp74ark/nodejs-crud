import { createServer } from 'node:http';
import { addNew } from '../controller/user.controller.js';
import { msgStartServer } from './messages.js';
import { getRoutes } from '../routes/getRoutes.js';
import { postRoutes } from '../routes/postRoutes.js';

export function startServer(address = '127.0.0.1', port = 3000, backlog = 64) {
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.method === 'GET') {
      const {code, data} = getRoutes(request.url);
      response.statusCode = code
      response.end(data);
    }
    if (request.method === 'PUT') {
      response.end('put');
    }
    if (request.method === 'POST') {
      postRoutes(request, response);
    }
    if (request.method === 'DELETE') {
      response.end('delete');
    }
  }).listen(port, address, backlog, () => {
    msgStartServer(address, port);
  });
}
