import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import articleReducer from './articlesReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';


const mainReducer = combineReducers({
    auth: authReducer,
    articles: articleReducer,
    errors: errorReducer,
    profile: profileReducer
});
export default mainReducer;
