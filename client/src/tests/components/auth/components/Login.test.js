import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router';
import Login  from '../../../../components/auth/component/Login';

describe('Test suite for the functional Login Component', () => {
    const props = {
        email: '',
        password: '',
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        user: {},
        errors:{
            email:'',
            password: ''
        }
    };

    it('should render  the Login form component', () => {
        const wrapper = mount(<Router><Login {...props} /></Router>);
        expect(wrapper.find('form')).toHaveLength(1);
    });
});
