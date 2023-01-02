import { User } from '../interfaces.js';

export let sharedData: User[] = [];

export function updateSharedData(data: User[]) {
  sharedData = [...sharedData, ...data];
}

export function overwriteSharedData(data: User[]) {
  sharedData = data;
}