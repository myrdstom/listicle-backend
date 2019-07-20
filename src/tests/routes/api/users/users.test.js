const request = require('supertest');
const app = require('../../../../app');
const User = require('../../../../models/User');
const mongoose = require('mongoose');

describe('Tests for user registration', () => {
    process.env.API_BASE = '/api';
    const apiBase = process.env.API_BASE + '/users';

    beforeEach(async () => {
        await User.deleteMany();
        await request(app)
            .post(apiBase + '/register')
            .send({
                username: 'myrdstom',
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            });
    });
    afterAll(done => {
        mongoose.connection.close(done);
    });


    it('Should sign-up a new user', async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                username: 'bgpeter',
                email: 'peter@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            })
            .expect(201);
        expect(response.body.user.email).toBe('peter@gmail.com');
    });
    it('Should return an error if the user registers with an existing email', async () => {
        const response = await request(app)
            .post(apiBase + '/register')
            .send({
                username: 'bgpeter',
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            })
            .expect(400);
        expect(response.body.email[0]).toBe('Email already exists');
    });

    it('Should log in a registered user', async () => {
        const response = await request(app)
            .post(apiBase + '/login')
            .send({
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
            })
            .expect(200);
        expect(response.body.success).toBe(true);
    });
    it('Should return the logged in user ', async () => {
        res = await request(app)
            .post(apiBase + '/login')
            .send({
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd'
            })
            .expect(200);
        const access_token = res.body.token;
        const response = await request(app)
            .get(apiBase + '/current')
            .set('Authorization', `${access_token}`)
            .expect(200);
        expect(response.body.email).toBe('nserekopaul@gmail.com');
    });
});
