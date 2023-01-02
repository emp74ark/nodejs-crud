import { User } from '../interfaces.js';
import { sharedData } from '../model/user.model.js';

export function getData() {
  process.send?.({ type: 'get' }); // from worker to master
  return sharedData;
}

export function updateData(values: User[]) {
  process.send?.({ type: 'update', payload: values }); // from worker to master
}