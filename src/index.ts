import * as dotenv from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import { startServer } from './modules/http.js';
import { User } from './interfaces.js';
import { msgStartProcess, msgStopProcess } from './modules/messages.js';
import { getData } from './controller/data.controller.js';
import { overwriteSharedData, updateSharedData } from './model/user.model.js';
import { multiModeChecker } from './modules/helpers/multiChecker.js';


dotenv.config();

const { HOST, PORT, BACKLOG } = process.env;

if (multiModeChecker() && cluster.isPrimary) {
  msgStartProcess('Master', process.pid);

  for (let i = 0; i < cpus().length; i++) {
    const forkPort = PORT !== undefined ? Number(PORT) + i : 4000 + 1 + i;
    const worker = cluster.fork({ port: forkPort });

    worker.on('message', (message: { type: string, payload: User[] }) => { // receive from worker, handle by master
      const { type, payload } = message;
      if (type === 'get') worker.send({ type: 'get', payload: getData() }); // from master, handle by worker
      if (type === 'update') updateSharedData(payload);
    });

  }

  cluster.on('exit', ({ process: { pid } }, code) => msgStopProcess(pid!, code));

}

if (multiModeChecker() && cluster.isWorker) {
  startServer(HOST, Number(process.env.port), Number(BACKLOG));
  msgStartProcess('Worker', process.pid);

  process.on('message', (message: { type: string, payload: User[] }) => { // from master to worker
    const { type, payload } = message;
    if (type === 'get') overwriteSharedData(payload);
  });

}

if (!multiModeChecker()) {
  startServer(HOST, Number(PORT), Number(BACKLOG));
}