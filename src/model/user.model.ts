import { User } from '../interfaces.js';

export let data: User[] = [];

export function getData() {
  return data;
}

export function updateData(values: User[]) {
  data = values;
}
