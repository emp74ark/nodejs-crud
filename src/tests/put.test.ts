import supertest from 'supertest';
import { User } from '../interfaces.js';

const host = '127.0.0.1';
const port = '4000';
const request = supertest(`${host}:${port}`);

const fakeData = {
  'username': 'UserName',
  'age': 20,
  'hobbies': ['chess'],
};

const fakeUpdatedData = {
  'username': 'NewUserName',
  'age': 20,
  'hobbies': ['chess'],
};

describe('PUT requests', () => {
  it('update user data', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201);
    const userId = await JSON.parse(users.text).find((el: User) => el.username === fakeData.username).id;
    const result = await request.put(`/api/users/${userId}`).send(fakeUpdatedData)
    expect(result.statusCode).toBe(200)
  });
  it('use wrong address to update data', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201);
    const userId = await JSON.parse(users.text).find((el: User) => el.username === fakeData.username).id;
    const result = await request.put(`/api/wrong_address/${userId}`).send(fakeUpdatedData)
    expect(result.statusCode).toBe(404)
  });
});