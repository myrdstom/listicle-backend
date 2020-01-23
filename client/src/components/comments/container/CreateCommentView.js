import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateComment from '../component/CreateComment';
import { createComment } from '../../../redux/actions/comments/commentsAction';

class CreateCommentView extends Component {
    constructor() {
        super();
        this.state = {
            body: '',
            errors: {},
        };
    }

    componentDidMount() {
        console.log();
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { body } = this.state;
        const commentData = {
            body,
        };
        const { createComment, articleSlug } = this.props;
        createComment(commentData, articleSlug);
        this.setState({body:''})
    };

    render() {
        const {body, errors} = this.state;
        const {username} = this.props.auth.user
            return <div>
                {
                    <CreateComment
                        body={body}
                        errors={errors}
                        username={username}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                    />
                }
            </div>;
    }
}

export const mapDispatchToProps = dispatch => ({
    createComment: (commentData, articleSlug) =>
        dispatch(createComment(commentData, articleSlug)),
});

CreateCommentView.propTypes = {
    createComment: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object,
    profile: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CreateCommentView));
