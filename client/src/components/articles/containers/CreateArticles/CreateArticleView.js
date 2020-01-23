import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateArticle from '../../component/CreateArticle/CreateArticle';
import Loader from '../../../Loader';
import { createArticle } from '../../../../redux/actions/articles/articlesAction';
import { getCurrentProfile } from '../../../../redux/actions/profile/profileActions';

class CreateArticleView extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            errors: {},
        };
    }
    componentDidMount() {
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
            this.setState({ errors: nextProps.errors }, () => {
            });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleBodyChange = (content, delta, source, editor) => {
        this.setState({ body: editor.getText() });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { title, body } = this.state;
        const articleData = {
            title,
            body,
        };
        const { createArticle, history } = this.props;
        createArticle(articleData, history);
    };

    render() {
        const { title, description, body,errors } = this.state;
        return (
            <div>
                {this.props.auth.loading || this.props.profile.loading ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <div>
                        <CreateArticle
                            title={title}
                            body={body}
                            errors={errors}
                            description={description}
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
    createArticle: (articleData, history) =>
        dispatch(createArticle(articleData, history)),
    getCurrentProfile: dispatch(getCurrentProfile()),
});

CreateArticleView.propTypes = {
    getCurrentProfile: PropTypes.func,
    createArticle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    profile: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
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
)(withRouter(CreateArticleView));
