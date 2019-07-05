const request = require('supertest');
const app = require('../../../../app');
const Profile = require('../../../../models/Profile');
const mongoose = require('mongoose');

describe('Tests for managing the user profile', () => {
  process.env.API_BASE = '/api';
  const userApiBase = process.env.API_BASE + '/users';
  const profileApiBase = process.env.API_BASE + '/profile';
  let access_token;

  beforeEach(async () => {
    await Profile.deleteMany();
    await request(app)
      .post(userApiBase + '/register')
      .send({
        email: 'nserekopaul@gmail.com',
        password: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
        firstName: 'Paul',
        lastName: 'Kayongo'
      });
    res = await request(app)
      .post(userApiBase + '/login')
      .send({
        email: 'nserekopaul@gmail.com',
        password: 'P@ssw0rd'
      })
      .expect(200);
    access_token = res.body.token;
  });
  afterAll(async done => {
    await mongoose.connection.close(done);
  });
  it('Should create a user profile', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        bio: 'I am an awesome developer',
        youtube: 'https://www.youtube.com/',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://www.twitter.com/',
        avatar: 'https://www.avatar.com/'
      })
      .expect(201);
    expect(response.body.bio).toBe('I am an awesome developer');
  });
  it('Should get a created user profile', async () => {
    await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        bio: 'I am an awesome developer',
        youtube: 'https://www.youtube.com/',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://www.twitter.com/',
        avatar: 'https://www.avatar.com/'
      })
      .expect(201);
    const response = await request(app)
      .get(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .expect(200);
    expect(response.body.bio).toBe('I am an awesome developer');
  });
  it('Should return an error when you try to get a  user profile with none created', async () => {
    const response = await request(app)
      .get(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .expect(404);
    expect(response.body.error).toBe('There is no profile for this user');
  });
});
