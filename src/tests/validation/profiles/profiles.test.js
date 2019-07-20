const request = require('supertest');
const app = require('../../../app');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const mongoose = require('mongoose');

describe('Tests for validating the user profile feature', () => {
    process.env.API_BASE = '/api';
    const userApiBase = process.env.API_BASE + '/users';
    const profileApiBase = process.env.API_BASE + '/profile';
    let access_token;

    beforeEach(async () => {
        await Profile.deleteMany();
        await User.deleteMany();
        await request(app)
            .post(userApiBase + '/register')
            .send({
                username:'myrdstom',
                email: 'nserekopaul@gmail.com',
                password: 'P@ssw0rd',
                confirmPassword: 'P@ssw0rd',
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
    afterAll(async done => {
        await mongoose.connection.close(done);
    });

    it('Should return an error when a user tries to create a profile when the youtube field is not a URL', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: 'Paul',
                lastName: 'Kayongo',
                youtube:'yoyo'
            })
            .expect(400);
        expect(response.body.youtube[0]).toBe('Youtube field doe not have a valid URL');
    });

    it('Should return an error when a user tries to create a profile when the twitter field is not a URL', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: 'Paul',
                lastName: 'Kayongo',
                twitter:'yoyo'
            })
            .expect(400);
        expect(response.body.twitter[0]).toBe('Twitter field doe not have a valid URL');
    });

    it('Should return an error when a user tries to create a profile when the instagram field is not a URL', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: 'Paul',
                lastName: 'Kayongo',
                instagram:'yoyo'
            })
            .expect(400);
        expect(response.body.instagram[0]).toBe('Instagram field doe not have a valid URL');
    });

    it('Should return an error when a user tries to create a profile when the avatar field is not a URL', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: 'Paul',
                lastName: 'Kayongo',
                avatar:'yoyo'
            })
            .expect(400);
        expect(response.body.avatar[0]).toBe('Avatar field doe not have a valid URL');
    });

    it('Should return an error when the firstName is empty', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: '',
                lastName: 'Kayongo',
                youtube:'yoyo'
            })
            .expect(400);
        expect(response.body.firstName[0]).toBe('First name must be between 2 and 30 characters');
    });
    it('Should return an error when the lastName is empty', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: 'Paul',
                lastName: '',
                youtube:'yoyo'
            })
            .expect(400);
        expect(response.body.lastName[0]).toBe('Last name must be between 2 and 30 characters');
    });
});
