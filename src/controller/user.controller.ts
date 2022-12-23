import { Route } from '../interfaces.js';
import { getData, updateData } from '../model/user.model.js';

export function getAll() {
  return JSON.stringify(getData());
}

export function getById(url: string | undefined): Route {
  const id = url?.match(/\d+$/g)?.[0];
  const user = getData().find((el) => el.id === id);
  const code = user === undefined ? 400 : 200;
  const response = user === undefined ? 'Not found' : JSON.stringify(user);
  return {
    code,
    data: response,
  };
}

export function addNew(body: Buffer) {
  const newData = [...getData(), JSON.parse(body.toString())];
  updateData(newData);
}

export function updateById(url: string | undefined, body: Buffer) {
  const id = url?.match(/\d+$/g)?.[0];
  const newData = getData().map((el) => (el.id === id ? (el = JSON.parse(body.toString())) : el));
  updateData(newData);
}

export function deleteById(url: string | undefined) {
  const id = url?.match(/\d+$/g)?.[0];
  const newData = getData().filter((el) => el.id !== id);
  updateData(newData);
}
