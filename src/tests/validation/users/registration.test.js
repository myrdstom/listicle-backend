const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const mongoose = require('mongoose');

describe('Tests for validating the user registration data', () => {
    process.env.API_BASE = '/api';
    const apiBase = process.env.API_BASE + '/users';

    beforeEach(async () => {
        await User.deleteMany();
    });
    afterAll(async done => {
        await mongoose.connection.close(done);
    });


    it('Should return an error when a user tries to register  without a username', async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                email: 'nserekopaull@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            })
            .expect(400);
        expect(response.body.username[0]).toBe(
            'Username is required'
        );
    });
    it("Should return an error when a user tries to register  with an invalid 'email' field", async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                email: 'email',
                username:'username',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            })
            .expect(400);
        expect(response.body.email[0]).toBe('Email is invalid');
    });
    it("Should return an error when a user tries to register  with an empty 'password' field", async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                email: 'email@gmail.com',
                password: '',
                username:'username',
            })
            .expect(400);
        expect(response.body.password[0]).toBe('Password is required');
    });
    it("Should return an error when a user tries to register  with the'password' and 'confirmPassword' fields not matching", async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                email: 'email@gmail.com',
                username:'username',
                password: 'P@ssw0rd',
                confirmPassword: '',
            })
            .expect(400);
        expect(response.body.confirmPassword[0]).toBe('Passwords must match');
    });

});
