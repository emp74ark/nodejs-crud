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

const fakeWrongData = '12345';

describe('DELETE requests', () => {
  it('delete user', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201); // user created
    const userId = await JSON.parse(users.text).find((el: User) => el.username === fakeData.username).id;
    const result = await request.delete(`/api/users/${userId}`)
    expect(result.statusCode).toBe(204)
  });
  it('delete wrong user', async () => {
    const post = await request
      .delete(`/api/users/${fakeWrongData}`)
    expect(post.statusCode).toBe(400);
    expect(post.text).toBe('Not found');
  });
  it('delete user on wrong address', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201); // user created
    const userId = await JSON.parse(users.text).find((el: User) => el.username === fakeData.username).id;
    const result = await request.delete(`/api/wrong_address/${userId}`)
    expect(result.statusCode).toBe(404)
  });
});