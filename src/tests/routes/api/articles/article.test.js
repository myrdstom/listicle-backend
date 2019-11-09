const request = require('supertest');
import app from '../../../../index';
import Article from '../../../../models/Article';
import User from '../../../../models/User';
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

    it('Should successfully create an article', async () => {
        const response = await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title: 'Javascript',
                body:
                    'Javascript is an extremely awesome language, I do not know what I would',
                description: 'This is how javascript is amazing',
            })
            .expect(201);
    });

    it('Should successfully get all articles', async () => {
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
            .get(articleApiBase + '/')
            .expect(200);
        expect(response.body[0].title).toBe('Javascript');
    });


    it('Should return a message if the user tries to access a non-existent article', async () => {
        const response = await request(app)
            .get(articleApiBase + '/javascript')
            .expect(404);
        expect(response.body.error).toBe('This article does not exist');
    });
    it('Should return a message if there are no articles in the database', async () => {
        const response = await request(app)
            .get(articleApiBase + '/')
            .expect(200);
        expect(response.body.error).toBe('There are no articles');
    });
    it('Should successfully delete an article', async () => {
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
            .delete(articleApiBase + '/javascript')
            .set('Authorization', `${access_token}`)
            .expect(200);
        expect(response.body.msg).toBe('Article successfully deleted');
    });
    it('Should return an error if the user tries to delete a non-existent article', async () => {
        const response = await request(app)
            .delete(articleApiBase + '/javascript')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.error).toBe('article not found');
    });
    it('Should successfully like an article', async () => {
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
        await request(app)
            .post(articleApiBase + '/like/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
    });
    it('Should successfully return an error if a user tries to like an article twice', async () => {
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
        await request(app)
            .post(articleApiBase + '/like/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
        const response = await request(app)
            .post(articleApiBase + '/like/javascript')
            .set('Authorization', `${access_token}`)
            .expect(400);
        expect(response.body.error).toBe('You have already liked this post');
    });
    it('Should return an error if a user tries to like a non-existent article', async () => {
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
        await request(app)
            .post(articleApiBase + '/like/javascript2')
            .set('Authorization', `${access_token}`)
            .expect(404);
    });
    it('Should return an error when a user tries to  unlike an article', async () => {
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
            .post(articleApiBase + '/unlike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(400);
        expect(response.body.error).toBe('You have not yet liked this article');
    });
    it('Should successfully like an article', async () => {
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
        await request(app)
            .post(articleApiBase + '/like/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
        await request(app)
            .post(articleApiBase + '/unlike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
    });
    it('Should return an error when a user tries to  unlike an article', async () => {
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
            .post(articleApiBase + '/unlike/javascript2')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.error).toBe('article not found');
    });
    it('Should successfully dislike an article', async () => {
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
        await request(app)
            .post(articleApiBase + '/dislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
    });
    it('Should return an error when a user tries to dislike an article twice', async () => {
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
        await request(app)
            .post(articleApiBase + '/dislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
        const response = await request(app)
            .post(articleApiBase + '/dislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(400);
        expect(response.body.error).toBe('You have already disliked this post');
    });
    it('Should return an error when a user tries to dislike an article that does not exist', async () => {
        const response = await request(app)
            .post(articleApiBase + '/dislike/javascript2')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.error).toBe('article not found');
    });
    it('Should return an error when a user tries to undislike an article they ahave not disliked', async () => {
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
            .post(articleApiBase + '/undislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(400);
        expect(response.body.error).toBe('You have not yet disliked this article');
    });
    it('Should return an error when a user tries to un-dislike a non-existent article', async () => {
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
            .post(articleApiBase + '/undislike/javascript2')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.error).toBe('article not found');
    });
    it('Should successfully un-dislike an article', async () => {
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
        await request(app)
            .post(articleApiBase + '/dislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
        await request(app)
            .post(articleApiBase + '/undislike/javascript')
            .set('Authorization', `${access_token}`)
            .expect(201);
    });
    it('Should successfully add a comment', async () => {
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
        await request(app)
            .post(articleApiBase + '/comment/javascript')
            .set('Authorization', `${access_token}`)
            .send({
                "body": "Well Python is not as awesome as javascript"
            })
            .expect(200);
    });
    it('Should successfully return an error when you try to delete a comment froma non-existent article', async () => {
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
        await request(app)
            .delete(articleApiBase + '/comment/javascript2/5678w3657w')
            .set('Authorization', `${access_token}`)
            .expect(404);
    });
    it('Should successfully return an error when you try to delete a non-existent comment', async () => {
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
            .delete(articleApiBase + '/comment/javascript/5678w3657w')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.message).toBe('Resource not found');
    });
});
