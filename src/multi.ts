import * as dotenv from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import { startServer } from './modules/http.js';

dotenv.config();

const { HOST, PORT, BACKLOG } = process.env;

if (cluster.isPrimary) {
  for (let i = 0; i < cpus().length; i++) {
    const forkPort = PORT !== undefined ? Number(PORT) + i : 4000 + 1 + i;
    cluster.fork({ port: forkPort });
  }
} else {
  startServer(HOST, Number(process.env.port), Number(BACKLOG));
}

