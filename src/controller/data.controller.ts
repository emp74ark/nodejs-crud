import { ClusterMessage, User } from '../interfaces.js';
import { overwriteSharedData, sharedData, updateSharedData } from '../model/user.model.js';
import cluster from 'cluster';

export function getData() {

  if (cluster.isPrimary) {
    return sharedData;
  }

  if (cluster.isWorker) {
    const message: ClusterMessage = { type: 'get', payload: sharedData }
    console.log('worker request data');
    process.send?.(message); // from worker to master

    process.on('message', (message: ClusterMessage) => { // from master to worker
      const { type, payload } = message;
      console.log('master get data', payload);
      if (type === 'overwrite') {
        overwriteSharedData(payload);
      }
      return payload
    });
  }

  console.log('return default');
  return sharedData;
}

export function updateData(values: User[]) {
  const message: ClusterMessage = { type: 'update', payload: values }
  process.send?.(message); // from worker to master
  if (cluster.isPrimary){
    updateSharedData(values)
  }
}