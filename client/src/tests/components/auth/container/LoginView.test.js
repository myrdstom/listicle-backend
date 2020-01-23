import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router';
import {
    LoginView,
    mapStateToProps,
} from '../../../../components/auth/container/LoginView';

describe('Test suite for tetsing the Login class component',() => {
    const props = {
        newUser: {
            email: 'nserekopaul@gmail.com',
            password: 'P@ssword',
        },
        errors: {},
        auth: { isAuthenticated: false },
        loginUser: jest.fn(),
        history: {
            push: jest.fn(),
        },
    };

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Router>
                <LoginView {...props} />
            </Router>
        );
    });

    it('should test mapStateToProps', () => {
        const initialState = {
            errors: {},
        };

        expect(mapStateToProps(initialState).errors).toEqual({});
    });
    it('should test `componentDidMount` lifecycle method when logging in a user', () => {
        const nextProps = {
            ...props,
            auth: { isAuthenticated: true },
        };
        const wrapper = mount(<LoginView {...nextProps}/>);
        const instance = wrapper.instance();
        // console.log(instance,'the instance')
        // expect(mapStateToProps(initialState).errors).toEqual({});
    });
});
