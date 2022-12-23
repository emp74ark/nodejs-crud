import { Route, User } from '../interfaces.js';
import { data } from '../model/user.model.js';

export function getAll() {
  return JSON.stringify(data);
}

export function getById(url: string | undefined): Route {
  const id = url?.match(/\d+$/g)?.[0];
  const user = data.find((el) => el.id === id);
  const code = user === undefined ? 400 : 200;
  const response = user === undefined ? 'Not found' : JSON.stringify(user);
  return {
    code,
    data: response
  };
}

export function addNew(body: Buffer) {
  data.push(JSON.parse(body.toString()) as User);
}
