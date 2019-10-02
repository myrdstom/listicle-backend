const request = require('supertest');
import app from '../../../index';
import User from '../../../models/User';
import Article from '../../../models/Article';
const mongoose = require('mongoose');

describe('Tests for validating the create articles feature', () => {
    process.env.API_BASE = '/api';
    const userApiBase = process.env.API_BASE;
    const articleApiBase = process.env.API_BASE + '/articles';
    let access_token;

    beforeEach(async () => {
        await Article.deleteMany();
        await User.deleteMany();
        await request(app)
            .post(userApiBase + '/register')
            .send({
                username: 'myrdstom',
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
            });
        const res = await request(app)
            .post(userApiBase + '/login')
            .send({
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
            })
            .expect(200);
        access_token = res.body.token;
    });
    afterAll(done => {
        mongoose.connection.close(done);
    });

    it('Should return an error when a user tries to create an article with an inappropriate description', async () => {
        const response = await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({ title: 'Javascript', body: 'narda', description: 'narda' })
            .expect(400);
        expect(response.body.description[0]).toBe(
            'Description be between 10 and 100 characters'
        );
    });
    // it('Should return an error when a user tries to create an article with an inappropriate title', async () => {
    //     const response = await request(app)
    //         .post(articleApiBase + '/')
    //         .set('Authorization', `${access_token}`)
    //         .send({ title: 'J', body: 'Javascript is amazing', description: 'Javascript is amazing' })
    //         .expect(400);
    //     expect(response.body.title[0]).toBe(
    //         'Title must be between 2 and 30 characters'
    //     );
    // });
});
