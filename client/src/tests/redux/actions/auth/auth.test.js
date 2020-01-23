import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_ERRORS, SET_CURRENT_USER } from '../../../../redux/actions/types';
import {
    registerUser,
    loginUser,
    setCurrentUser,
} from '../../../../redux/actions/auth/auth';
import users from '../../../__mocks__/users';

const mockStore = configureMockStore([thunk]);
const userData = {
    username: users.username,
    email: users.email,
    password: users.password,
    confirmPassword: users.confirmPassword,
};

const userRegister = {
    username: 'bgpeter',
    email: 'bgpeter@gmail.com',
    password: 'P@ssw0rd',
    confirmPassword: 'P@ssw0rd',
};
const loginUserData = {
    email: users.email,
    password: users.password,
};
describe('Test suite for register action', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    it('Should successfully register a user', done => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response:{}
            }).then(() => {
                done();
            });
        });

        const store = mockStore({});
        store.dispatch(registerUser(userRegister));
    });
    it('Should fail to register a user', done => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: { error: 'User already exists' },
            }).then(() => {

                done();
            });
        });
        const store = mockStore({});
        store.dispatch(registerUser(userData));

    });
});

describe('Set LoggedIn User', () => {
    const response = { isAuthenticated: false };
    const responseData = {
        type: SET_CURRENT_USER,
        payload: { isAuthenticated: false },
    };
    it('should return action type and payload', () => {
        expect(setCurrentUser(response)).toEqual(responseData);
    });
});
