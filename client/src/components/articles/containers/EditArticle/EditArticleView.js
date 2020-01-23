import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditArticle from '../../component/EditArticle/EditArticle';
import Loader from '../../../Loader';
import { getArticle } from '../../../../redux/actions/articles/articlesAction';
import { editArticle } from '../../../../redux/actions/articles/articlesAction';
import { getCurrentProfile } from '../../../../redux/actions/profile/profileActions';


class EditArticleView extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            errors: {},
        };
    }
    componentDidMount() {
        this.props.getArticle(this.props.match.params.articleSlug);
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
        if(nextProps.article){
            const {avatar, body, title} = nextProps.article;
            this.setState({
                avatar,
                title,
                body,
            });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleBodyChange = (content, delta, source, editor) => {
        if(this.state.body !== ''){
            this.setState({ body: 'test' });
        }
        this.setState({ body: editor.getText() });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { title, description, body } = this.state;
        const articleData = {
            title,
            description,
            body,
        };

        const { editArticle, history } = this.props;
        editArticle(articleData, history);
    };

    render() {
        const { title, body } = this.state;
        return (
            <div>
                {this.props.auth.loading || this.props.profile.loading ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <div>
                        <EditArticle
                            title={title}
                            body={body}
                            onChange={this.handleChange}
                            onHandleChange={this.handleBodyChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => ({
    getArticle: articleSlug => dispatch(getArticle(articleSlug)),
    editArticle: (articleData, history) =>
        dispatch(editArticle(articleData, history)),
    getCurrentProfile: dispatch(getCurrentProfile()),
});

EditArticleView.propTypes = {
    article: PropTypes.object.isRequired,
    getArticle: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    editArticle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    profile: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
    article: state.articles.article,
    auth: state.auth,
    profile: state.profile,
    errors: state.errors,
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditArticleView));
