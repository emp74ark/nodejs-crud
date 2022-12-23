import { createServer } from 'node:http';
import { addNew } from '../controller/user.controller.js';
import { msgStartServer } from './messages.js';
import { getRoutes } from '../routes/getRoutes.js';

export function startServer(address = '127.0.0.1', port = 3000, backlog = 64) {
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.method === 'GET') {
      const route = getRoutes(request.url);
      response.statusCode = route.code
      response.write(route.data);
      response.end();
    }
    if (request.method === 'PUT') {
      response.end('put');
    }
    if (request.method === 'POST') {
      const chunks: Buffer[] = [];
      request.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      request.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const body = Buffer.from(buffer)
        addNew(body)
        response.statusCode = 201;
        response.end(body);
      });
    }
    if (request.method === 'DELETE') {
      response.end('delete');
    }
  }).listen(port, address, backlog, () => {
    msgStartServer(address, port);
  });
}
