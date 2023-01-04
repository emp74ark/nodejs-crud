import supertest from 'supertest';
import { config } from 'dotenv';

config();

const { HOST, PORT } = process.env;

const request = supertest(`${HOST}:${PORT}`);

describe('GET requests', () => {
  it('greeting from root', async () => {
    const result = await request.get('/');
    expect(result.statusCode).toBe(200);
    expect(result.text).toBe(`API address is ${HOST}:${PORT}/api`);
  });
  it('greeting from api', async () => {
    const result = await request.get('/api');
    expect(result.statusCode).toBe(200);
    expect(result.text).toBe('api');
  });
  it('get users', async () => {
    const result = await request.get('/api/users/');
    expect(result.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(result.text))).toBeTruthy();
  });
  it('get 400', async () => {
    const result = await request.get('/api/users/1');
    expect(result.statusCode).toBe(400);
  });
  it('get 404', async () => {
    const result = await request.get('/api/unknown');
    expect(result.statusCode).toBe(404);
    expect(result.text).toBe('Page not found');
  });
});