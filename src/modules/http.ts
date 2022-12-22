import { createServer } from 'node:http';
import { msgStartServer } from './messages.js';
import { serverRouter } from './routes/getRoutes.js';

export function startServer(address = '127.0.0.1', port = 3000, backlog = 64) {
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.method === 'GET') {
      const route = serverRouter(request.url)
      response.write(route.data);
      response.end();
    }
    if (request.method === 'PUT') {
      response.end('put')
    }
    if (request.method === 'POST') {
      response.end('post')
    }
    if(request.method === 'DELETE') {
      response.end('delete')
    }
  }).listen(port, address, backlog, () => {
    msgStartServer(address, port);
  });
}
