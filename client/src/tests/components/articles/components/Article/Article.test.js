import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router';
import Article from '../../../../../components/articles/component/Article/Article';

describe('Test suite for the View article functional component', () =>{
    const props ={
        article:'',
        auth:'',
        onHandleLike: jest.fn(),
        onDeleteClick: jest.fn(),
        onHandleDislike:jest.fn(),
        likedStatus:'',
        dislikedStatus:'',


    }
    it('should render  the Login form component', () => {
        const wrapper = mount(<Router><Article {...props} /></Router>);
        expect(wrapper.find('container')).toHaveLength(1);
    });
})