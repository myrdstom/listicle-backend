import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteComment } from '../../../redux/actions/comments/commentsAction';

class CommentItem extends Component {
    onDeleteComment(commentId) {
        const articleSlug = this.props.match.params.articleSlug;
        const { deleteComment } = this.props;
        deleteComment(articleSlug, commentId);
    }
    render() {
        const { comment, username, auth,  commentId } = this.props;

        return (
            <div className="comments">
                <br />
                <br />
                <span className="comment__username">{username}</span>
                <br />
                <span className="comment__body">{comment}</span>
                <br />
                {auth.user.username === username ? (
                    <span
                        className="delete__comment"
                        onClick={this.onDeleteComment.bind(this, commentId)}
                    >
                        {' '}
                        <i className="fas fa-trash-alt fa-s delete__comment-favicon" />{' '}
                        Delete
                    </span>
                ) : (
                    ''
                )}
            </div>

        );
    }
}

export const mapDispatchToProps = dispatch => ({
    deleteComment: (articleSlug, commentId) =>
        dispatch(deleteComment(articleSlug, commentId)),
});
CommentItem.propTypes = {
    deleteComment: PropTypes.func,
};

export const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CommentItem));
