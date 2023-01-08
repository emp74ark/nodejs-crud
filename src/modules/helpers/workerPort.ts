import { cpus } from 'node:os';

let workerPort: number;

export function nextWorkerPort(masterPort: number) {
  if (!workerPort) {
    workerPort = masterPort + 1;
  } else if (workerPort - masterPort < cpus().length) {
    workerPort++;
  } else {
    workerPort = masterPort + 1;
  }
  return workerPort;
}