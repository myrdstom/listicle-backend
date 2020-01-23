const request = require('supertest');
import app from '../../../../index';
import User from '../../../models/User'
const mongoose = require('mongoose');

describe('Tests for validating the login data', () => {
  process.env.API_BASE = '/api';
  const apiBase = process.env.API_BASE;

  beforeEach(async () => {
    await User.deleteMany();
    await request(app)
      .post(apiBase + '/register')
      .send({
        email: 'nserekopaul@gmail.com',
        password: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
      });
  });
  afterAll(async done => {
    mongoose.connection.close(done);
  });

  it('Should return an error when a user tries to login  with an invalid email', async () => {
    const response = await request(app)
      .post(apiBase + '/login')
      .send({
        email: 'paul',
        password: 'password'
      })
      .expect(400);
    expect(response.body.email[0]).toBe('Email is invalid');
  });

  it('Should return an error when a user tries to login  without a password', async () => {
    const response = await request(app)
      .post(apiBase + '/login')
      .send({
        email: 'paul'
      })
      .expect(400);
    expect(response.body.password[0]).toBe('Password is required');
  });

  it('Should return an error when a user tries to login  with non-existent credentials', async () => {
    const response = await request(app)
      .post(apiBase + '/login')
      .send({
        email: 'jlule@gmail.com',
        password: 'password'
      })
      .expect(404);
    expect(response.body.email).toBe('User not found');
  });
});
