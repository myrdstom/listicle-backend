import 'babel-polyfill';
const request = require('supertest');
import { app } from '../../../app';
import ProfileSchema from '../../../models/Profile';
const Profile = ProfileSchema;
const mongoose = require('mongoose');

describe('Tests for validating the user profile feature', () => {
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
    const res = await request(app)
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

  it('Should return an error when a user tries to create a profile without a username', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({})
      .expect(400);
    expect(response.body.username[0]).toBe('Username is required');
  });
  it('Should return an error when a user tries to create a profile when the youtube field is not a URL', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        youtube: 'yoyo'
      })
      .expect(400);
    expect(response.body.youtube[0]).toBe(
      'Youtube field doe not have a valid URL'
    );
  });
  it('Should return an error when a user tries to create a profile when the twitter field is not a URL', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        twitter: 'yoyo'
      })
      .expect(400);
    expect(response.body.twitter[0]).toBe(
      'Twitter field doe not have a valid URL'
    );
  });
  it('Should return an error when a user tries to create a profile when the instagram field is not a URL', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        instagram: 'yoyo'
      })
      .expect(400);
    expect(response.body.instagram[0]).toBe(
      'Instagram field doe not have a valid URL'
    );
  });
  it('Should return an error when a user tries to create a profile when the avatar field is not a URL', async () => {
    const response = await request(app)
      .post(profileApiBase + '/')
      .set('Authorization', `${access_token}`)
      .send({
        username: 'myrdstom',
        avatar: 'yoyo'
      })
      .expect(400);
    expect(response.body.avatar[0]).toBe(
      'Avatar field doe not have a valid URL'
    );
  });
});
