import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router';
import { toast } from 'react-toastify';
import Registration from '../../../../components/auth/component/Registration';

describe('Test suite for the function Register user component', () => {
    let wrapper;
    const props = {
        confirmPassword: '',
        email: '',
        errors: {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        },
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        password: '',
        user: {},
        username: '',
    };

    it('should render the user registration component', () => {
        const wrapper = mount(
            <Router>
                <Registration {...props} />
            </Router>
        );
        expect(wrapper.find('form')).toHaveLength(1);
    });
});
