import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import setAuthToken from '../../../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from '../types';

// Register the User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('api/register', userData)
        .then(res => {
            history.push('/login');
            toast.success('Congratulation!! You have been registered!');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response,
            })
        );
};

//Login User
export const loginUser = userData => dispatch => {
    axios
        .post('api/login', userData)
        .then(res => {
            toast.success('Congratulation!! You have logged In!');
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token
            const decoded = jwt_decode(token);
            // Set the current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

//Set loggedIn User on every page
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

// Logout the user
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    //Remove the auth header from utils
    setAuthToken(false);
    //Empty current user and set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
