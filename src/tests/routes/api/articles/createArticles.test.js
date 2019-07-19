
const request = require('supertest');
const app = require('../../../../app');
const Article = require('../../../../models/Article');
const mongoose = require('mongoose');

describe('Tests for validating the create articles feature', () => {
    process.env.API_BASE = '/api';
    const userApiBase = process.env.API_BASE + '/users';
    const articleApiBase = process.env.API_BASE + '/articles';
    let access_token;

    beforeEach(async () => {
        await Article.deleteMany();
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
    afterAll( done => {
        mongoose.connection.close(done);
    });

    it('Should successfully create an article', async () => {
        const response = await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title:"Javascript",
                body:"Javascript is an extremely awesome language, I do not know what I would",
                description:"This is how javascript is amazing"})
            .expect(201);

    });
    it('Should successfully get all articles', async () => {
        await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title:"Javascript",
                body:"Javascript is an extremely awesome language, I do not know what I would",
                description:"This is how javascript is amazing"})
            .expect(201);
        const response = await request(app)
            .get(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title:"Javascript",
                body:"Javascript is an extremely awesome language, I do not know what I would",
                description:"This is how javascript is amazing"})
            .expect(200);
        expect(response.body[0].title).toBe('Javascript');

    });
    it('Should successfully get all articles', async () => {
        await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title:"Javascript",
                body:"Javascript is an extremely awesome language, I do not know what I would",
                description:"This is how javascript is amazing"})
            .expect(201);
        const response = await request(app)
            .get(articleApiBase + '/javascript')
            .expect(200);
        expect(response.body.articleSlug).toBe('javascript');

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
        expect(response.body.error).toBe('This database has no articles');

    });
    it('Should successfully delete an article', async () => {
        await request(app)
            .post(articleApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                title:"Javascript",
                body:"Javascript is an extremely awesome language, I do not know what I would",
                description:"This is how javascript is amazing"})
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
        expect(response.body.error).toBe('Article not found');

    });
});
