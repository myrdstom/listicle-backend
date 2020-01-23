import {
    ARTICLE_LOADING,
    GET_ARTICLES,
    GET_ARTICLE,
    ADD_ARTICLE,
    DELETE_ARTICLE,
} from '../actions/types';

const initialState = {
    articles: [],
    article: {},
    loading: false,
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false,
            };
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload,
                loading: false,
            };
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [action.payload, ...state.articles],
                loading: false,
            };
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(
                    article => article.articleSlug !== action.payload
                ),
                loading: false,
            };
        default:
            return state;
    }
};

export default articleReducer;
