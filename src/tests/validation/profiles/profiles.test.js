const request = require('supertest');
import app from '../../../../index';
import Profile from '../../../models/Profile';
import User from '../../../models/User';
const mongoose = require('mongoose');

describe('Tests for validating the user profile feature', () => {
    process.env.API_BASE = '/api';
    const userApiBase = process.env.API_BASE;
    const profileApiBase = process.env.API_BASE + '/profiles';
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
        expect(response.body.avatar[0]).toBe('Please provide a link to an image');
    });

    it('Should return an error when the firstName is empty', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                firstName: '',
                lastName: 'Kayongo'
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
                lastName: ''
            })
            .expect(400);
        expect(response.body.lastName[0]).toBe('Last name must be between 2 and 30 characters');
    });
});
