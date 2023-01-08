import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { cpus } from 'os';
import { startMaster, startServer } from './modules/http.js';
import { ClusterMessage } from './interfaces.js';
import { msgStartProcess, msgStopProcess } from './modules/messages.js';
import { overwriteSharedData } from './model/user.model.js';
import { multiModeChecker } from './modules/helpers/multiChecker.js';


dotenv.config();

const { HOST, PORT, BACKLOG } = process.env;

if (multiModeChecker() && cluster.isPrimary) {
  msgStartProcess('Master', process.pid);
  startMaster(HOST, Number(PORT), Number(BACKLOG));

  for (let i = 0; i < cpus().length; i++) {
    const forkPort = PORT !== undefined ? Number(PORT) + 1 + i : 4000 + 1 + i;
    const worker = cluster.fork({ port: forkPort });

    worker.on('message', (message: ClusterMessage) => { // from worker to master
      const { type, payload } = message;
      if (type === 'update') {
        for (const id in cluster.workers) {
          cluster.workers[id]?.send({ type: 'overwrite', payload: payload });
        }
      }
    });

  }

  cluster.on('exit', ({ process: { pid } }, code) => msgStopProcess(pid!, code));

}

if (multiModeChecker() && cluster.isWorker) {
  startServer(HOST, Number(process.env.port), Number(BACKLOG));
  msgStartProcess('Worker', process.pid);

  process.on('message', (message: ClusterMessage) => { // from master to worker
    const { type, payload } = message;
    if (type === 'overwrite') {
      overwriteSharedData(payload);
    }
  });

}

if (!multiModeChecker()) {
  startServer(HOST, Number(PORT), Number(BACKLOG));
}