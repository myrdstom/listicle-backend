import 'babel-polyfill';
import supertest from 'supertest';
const request = supertest;
import { app } from '../../../../app';
import ProfileSchema from '../../../../models/Profile';
import { accessToken } from '../../../__Mocks__/users';
const Profile = ProfileSchema;
const mongoose = require('mongoose');

describe('Tests for managing the user profile', () => {
  process.env.API_BASE = '/api';
  const userApiBase = process.env.API_BASE + '/users';
  const profileApiBase = process.env.API_BASE + '/profile';
  let access_token;

  beforeEach(async done => {
    Profile.deleteMany();
    request(app)
      .post(userApiBase + '/register')
      .send({
        email: 'nserekopaul@gmail.com',
        password: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
        firstName: 'Paul',
        lastName: 'Kayongo'
      });
    const res = request(app)
      .post(userApiBase + '/login')
      .send({
        email: 'nserekopaul@gmail.com',
        password: 'P@ssw0rd'
      })
      .expect(200);
    done();
    access_token = res.data.token;
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
    expect(response.data.bio).toBe('I am an awesome developer');
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
    expect(response.data.bio).toBe('I am an awesome developer');
  });
  it('Should return an error when you try to get a  user profile with none created', async () => {
    const response = await request(app)
      .get(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .expect(404);
    expect(response.data.error).toBe('There is no profile for this user');
  });
});
