const request = require('supertest');
const app = require('../app');
const User = require('../models/UserModel') // Your application's entry point
const path = require('path')

let authToken
const credentialBody = {
  username: 'Hung',
  password: 'best_secret_p@ssword'
}

describe('simple authentication using JWT token', () => {
  beforeAll(async () => {
    await User.deleteMany({
      username: credentialBody.username
    })
  })

  afterAll((done) => {
    app.close(done)
  });

  it('should return "Home page" when GET / is called', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Home page');
  });

  it('should register an account successfully', async ()  => {
    const response = await request(app)
      .post('/api/user/register')
      .send(credentialBody)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
  })

  it('should prevent user register new account with exist email', async ()  => {
    const response = await request(app)
      .post('/api/user/register')
      .send(credentialBody)
    expect(response.status).toBe(400);
  })

  it('should sign in successfully', async ()  => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: credentialBody.username,
        password: credentialBody.password,
      })
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('auth-token')
    authToken = response.headers['auth-token']
  })

  it('should get user id with token successfully', async ()  => {
    const response = await request(app)
      .get('/api/private')
      .set('auth-token', authToken)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('iat');
  })

  it('should sign in with revoked token unsuccessfully', async ()  => {
    await delay(2000)
    const response = await request(app)
      .get('/api/private')
      .set('auth-token', authToken)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message.name).toBe('TokenExpiredError');
  })
});

describe('API handler a form upload file', () => {
  beforeAll(() => {
    // require('fs').rmSync(path.resolve(__dirname, '../tmp'), {
    //   recursive: true,
    //   force: true
    // });
  })
  afterAll((done) => {
    app.close(done)
  });

  it('should sign in successfully', async ()  => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: credentialBody.username,
        password: credentialBody.password,
      })
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('auth-token')
    authToken = response.headers['auth-token']
  })

  it('should reject unauthenticated user', async ()  => {
    const response = await request(app)
      .post('/api/upload')
      .attach('data', path.resolve(__dirname, 'sample.txt'));
    expect(response.status).toBe(401);
  })

  it('should reject text file', async ()  => {
    const response = await request(app)
      .post('/api/upload')
      .attach('data', path.resolve(__dirname, 'sample.txt'))
      .set('auth-token', authToken);
    expect(response.status).toBe(500);
  })

  it('should upload file successfully', async ()  => {
    const response = await request(app)
      .post('/api/upload')
      .attach('data', path.resolve(__dirname, 'sample.jpg'))
      .set('auth-token', authToken);
    expect(response.status).toBe(200);
  })
})

function delay(t, v) {
  return new Promise(resolve => setTimeout(resolve, t, v));
}
