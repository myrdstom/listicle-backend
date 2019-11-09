const request = require('supertest');
import app from '../../../../index';
import Article from '../../../../models/Article';
import User from '../../../../models/User';
const mongoose = require('mongoose');

describe('Tests for validating the create articles feature', () => {
    process.env.API_BASE = '/api';
    const userApiBase = process.env.API_BASE;
    const articleApiBase = process.env.API_BASE + '/articles';
    const searchApiBase = process.env.API_BASE + '/articles/filter';
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

    it('Should successfully return the article that meets the query specs', async () => {
        await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title: 'Javascript',
                body:
                    'Javascript is an extremely awesome language, I do not know what I would',
                description: 'This is how javascript is amazing',
            })
            .expect(201);
        const response = await request(app)
            .get(searchApiBase + '/search?results=java')
            .set('Authorization', `${access_token}`)
            .send({
                title: 'Javascript',
                body:
                    'Javascript is an extremely awesome language, I do not know what I would',
                description: 'This is how javascript is amazing',
            })
            .expect(200);
        expect(response.body[0].title).toBe('Javascript');
    });

    it('Should return an error if no articles are found', async() =>{
        const response = await request(app)
            .get(searchApiBase + '/search?results=Climate')
            .set('Authorization', `${access_token}`)
            .send({
                title: 'Javascript',
                body:
                    'Javascript is an extremely awesome language, I do not know what I would',
                description: 'This is how javascript is amazing',
            })
            .expect(200);
        expect(response.body.error).toBe('There are no articles with these parameters');
    })


});
