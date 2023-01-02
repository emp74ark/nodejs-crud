import { User } from '../interfaces.js';
import { sharedData, updateSharedData } from '../model/user.model.js';
import cluster from 'cluster';

export function getData() {
  process.send?.({ type: 'get' }); // from worker to master
  return sharedData;
}

export function updateData(values: User[]) {
  process.send?.({ type: 'update', payload: values }); // from worker to master
  if (cluster.isPrimary){
    updateSharedData(values)
  }
}