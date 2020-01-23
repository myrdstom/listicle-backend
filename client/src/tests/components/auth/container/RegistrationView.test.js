import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router';
import {
    RegistrationView,
    mapStateToProps,
} from '../../../../components/auth/container/RegistrationView';

describe('Test suite for testing the Registration class component', () => {
    const props = {
        registerUser: jest.fn(),
        auth: { isAuthenticated: false },
        user: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        errors: {},
        history: {
            push: jest.fn(),
        },
    };
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Router>
                <RegistrationView {...props} />
            </Router>
        );
    });
    it('should test mapStateToProps', () => {
        const initialState = {
            errors: {},
            auth: { isAuthenticated: false },
        };
        expect(mapStateToProps(initialState).errors).toEqual({});
        expect(mapStateToProps(initialState).auth.isAuthenticated).toEqual(
            false
        );
    });
    // it('should test `componentDidMount` lifecycle method when registering a user', () => {
    //         const nextProps = {
    //             ...props,
    //             user: {
    //                 username: 'myrdstom',
    //                 email: 'nserekopaul@gmail.com',
    //                 password: 'P@ssw0rd',
    //                 confirmPassword: 'P@ssw0rd',
    //             },
    //         };
    //         const wrapper = mount(<RegistrationView {...nextProps}/>);
    //         const instance = wrapper.instance();
    //         // console.log(instance,'the instance')
    //         // expect(mapStateToProps(initialState).errors).toEqual({});
    //     });
});
