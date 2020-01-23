const request = require('supertest');
import app from '../../index';
const mongoose = require('mongoose');


describe('Tests for validating the login data', () => {
    process.env.API_BASE = '/api';
    const apiBase = process.env.API_BASE + '/userss';
    afterEach(async done => {
        mongoose.connection.close(done);
    });

    it('Should sign-up a new user', async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .expect(404);
    });

});