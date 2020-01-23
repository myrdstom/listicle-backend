import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store/combineStore';

import Header from './components/header/container/Header';
import GetAllArticlesView from './components/articles/containers/ViewArticles/GetAllArticlesView';
import GetArticleView from './components/articles/containers/ViewArticle/GetArticleView';
import CreateArticleView from './components/articles/containers/CreateArticles/CreateArticleView';
import LoginView from './components/auth/container/LoginView';
import GetProfileView from './components/profile/container/GetProfileView';
import CreateProfileView from './components/profile/container/CreateProfileView';
import RegistrationView from './components/auth/container/RegistrationView';
import EditArticleView from './components/articles/containers/EditArticle/EditArticleView';
import NotFoundPage from './components/NotFoundPage';
import checkForToken from './utils/getToken';
import Footer from './components/Footer';

// Check for token on every page
checkForToken()

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <ToastContainer autoClose={3000} />
                <Switch>
                    <Route exact path="/" component={GetAllArticlesView} />
                    <Route exact path="/article" component={CreateArticleView} />
                    <Route exact path="/login" component={LoginView} />
                    <Route
                        exact
                        path="/register"
                        component={RegistrationView}
                    />
                    <Route exact path="/profile" component={GetProfileView} />
                    <Route
                        exact
                        path="/create-profile"
                        component={CreateProfileView}
                    />
                    <Route exact path="/article/:articleSlug" component={GetArticleView} />
                    <Route exact path="/article/:articleSlug/edit" component={EditArticleView} />
                    <Route component={NotFoundPage} />
                </Switch>
                {/*<Footer/>*/}
            </Router>
        </Provider>
    );
}
export default App;
