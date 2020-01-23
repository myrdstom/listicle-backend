const request = require('supertest');
import app from '../../../../../index';
import Profile from '../../../../models/Profile';
import User from '../../../../models/User';
const mongoose = require('mongoose');

describe('Tests for managing the user profile', () => {
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
                username: 'myrdstom',
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
    it('Should create a user profile', async () => {
        const response = await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                bio: 'I am an awesome developer',
                firstName: 'Paul',
                lastName: 'Kayongo',
                avatar: 'https://s3-us-west-1.amazonaws.com/co-directory-images/busulwa-peter-nsereko-12139020.jpg'
            })
            .expect(201);
        expect(response.body.bio).toBe('I am an awesome developer');
    });

    it('Should get a created user profile', async () => {
        await request(app)
            .post(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .send({
                bio: 'I am an awesome developer',
                firstName: 'Paul',
                lastName: 'Kayongo',
                avatar: 'https://s3-us-west-1.amazonaws.com/co-directory-images/busulwa-peter-nsereko-12139020.jpg'
            })
            .expect(201);
        const response = await request(app)
            .get(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .expect(200);
        expect(response.body.bio).toBe('I am an awesome developer');
    });
    it('Should return an error when you try to get a  user profile with none created', async () => {
        const response = await request(app)
            .get(profileApiBase + '/')
            .set('Authorization', `${access_token}`)
            .expect(404);
        expect(response.body.error).toBe('There is no profile for this user');
    });
});
