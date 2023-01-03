import { ClusterMessage, User } from '../interfaces.js';
import { overwriteSharedData, sharedData } from '../model/user.model.js';
import cluster from 'cluster';

export function getData() {
  return sharedData;
}

export function updateData(values: User[]) {
  if (cluster.isWorker) { // multi mode
    const update: ClusterMessage = { type: 'update', payload: values }
    process.send?.(update); // from worker to master
  }
  if (cluster.isPrimary){ //single mode
    overwriteSharedData(values)
  }
}