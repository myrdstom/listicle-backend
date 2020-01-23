import axios from 'axios';
import { GET_ERRORS } from '../types';
import {getArticle} from '../articles/articlesAction';

export const likeArticle = (articleSlug, history) => dispatch => {
    axios
        .post(`/api/articles/like/${articleSlug}`)
        .then(res=>dispatch(getArticle(articleSlug)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

export const dislikeArticle = (articleSlug, history) => dispatch => {
    axios
        .post(`/api/articles/dislike/${articleSlug}`)
        .then(res=>dispatch(getArticle(articleSlug)))

        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

