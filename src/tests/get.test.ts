import supertest from 'supertest';

const host = '127.0.0.1';
const port = '4000';
const request = supertest(`${host}:${port}`);

describe('GET requests', () => {
  it('greeting from root', async () => {
    const result = await request.get('/');
    expect(result.statusCode).toBe(200);
    expect(result.text).toBe(`API address is ${host}:${port}/api`);
  });
  it('greeting from api', async () => {
    const result = await request.get('/api');
    expect(result.statusCode).toBe(200);
    expect(result.text).toBe('api');
  });
  it('get users', async () => {
    const result = await request.get('/api/users/');
    expect(result.statusCode).toBe(200);
    expect(result.text).toBe('[]');
  });
  it('get 400', async () => {
    const result = await request.get('/api/users/1');
    expect(result.statusCode).toBe(400);
  });
  it('get 404', async () => {
    const result = await request.get('/api/unknown');
    expect(result.statusCode).toBe(404);
    expect(result.text).toBe('Not found');
  });
});