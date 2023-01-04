import { User } from '../interfaces.js';
import supertest from 'supertest';
import { config } from 'dotenv';

config();

const { HOST, PORT } = process.env;

const request = supertest(`${HOST}:${PORT}`);

const fakeData = {
  'username': 'UserName',
  'age': 20,
  'hobbies': ['chess'],
};

const fakeWrongData = {
  'username': 'UserName',
};

describe('POST requests', () => {
  it('post user', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201);
    expect(JSON.parse(users.text).filter((el: User) => el.username === fakeData.username).length).toBeGreaterThan(0);
  });
  it('post wrong user data', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeWrongData);
    expect(post.statusCode).toBe(400);
    expect(post.text).toBe('Body does not contain required fields');
  });
  it('post to wrong address', async () => {
    const post = await request
      .post('/api/wrong/')
      .send(fakeData);
    expect(post.statusCode).toBe(404);
    expect(post.text).toBe('Not found');
  });
});