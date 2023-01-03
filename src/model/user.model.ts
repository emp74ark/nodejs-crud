import { User } from '../interfaces.js';

export let sharedData: User[] = [];

export function overwriteSharedData(data: User[]) {
  sharedData = data;
}