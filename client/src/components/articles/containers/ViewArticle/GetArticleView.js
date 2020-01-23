import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    deleteArticle,
    getArticle,
} from '../../../../redux/actions/articles/articlesAction';
import {
    likeArticle,
    dislikeArticle,
} from '../../../../redux/actions/likes/likeActions';
import NotFoundPage from '../../../NotFoundPage';
import Article from '../../component/Article/Article';
import Loader from '../../../Loader';
import { getCurrentProfile } from '../../../../redux/actions/profile/profileActions';

import CreateCommentView from '../../../comments/container/CreateCommentView';
import CommentItem from '../../../comments/component/CommentItem';
import Footer from '../../../Footer';

class GetArticleView extends Component {
    constructor() {
        super();
        this.state = {
            articleSlug: '',
            likes: [],
            dislikes: [],
            likedStatus: '',
            dislikedStatus: '',
            loading: '',
        };
    }
    componentDidMount() {
        const articleSlug = this.props.getArticle(
            this.props.match.params.articleSlug
        );
        this.setState({ articleSlug });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.article !== nextProps) {
            setTimeout(this.status, 3000);
        }
    }

    status = () => {
        const { article, auth } = this.props;
        let likesArray = [];
        let dislikesArray = [];
        const userId = auth.user.id;
        if (article && article.likes) {
            likesArray = article.likes;
        }

        if (article && article.dislikes) {
            dislikesArray = article.dislikes;
        }
        if (likesArray && likesArray.length > 0) {
            likesArray.forEach(element => {
                if (element.user === userId) {
                    this.setState({ likedStatus: true });
                    this.setState({ dislikedStatus: false });
                }
            });
        }

        if (dislikesArray && dislikesArray.length > 0) {
            dislikesArray.forEach(element => {
                if (element.user === userId) {
                    this.setState({ dislikedStatus: true });
                    this.setState({ likedStatus: false });
                }
            });
        }
    };
    like = () => {
        const articleSlug = this.props.match.params.articleSlug;
        const { likeArticle, history } = this.props;
        this.status();
        likeArticle(articleSlug, history);
    };

    dislike = () => {
        const articleSlug = this.props.match.params.articleSlug;
        const { dislikeArticle, history } = this.props;
        this.status();
        dislikeArticle(articleSlug, history);
    };

    onDeleteClick = () => {
        const articleSlug = this.props.match.params.articleSlug;
        const { deleteArticle } = this.props;
        deleteArticle(articleSlug);
    };

    render() {
        const { article, loading, auth } = this.props;
        const { likedStatus, dislikedStatus } = this.state;

        if (
            loading ||
            this.props.profile.loading ||
            !article ||
            !article.likes
        ) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
        return (
            <div>
                {article === null ? (
                    <NotFoundPage />
                ) : (
                    <div>
                        <Article
                            article={article}
                            auth={auth}
                            likedStatus={likedStatus}
                            dislikedStatus={dislikedStatus}
                            onDeleteClick={this.onDeleteClick}
                            onHandleLike={this.like}
                            onHandleDislike={this.dislike}
                        />
                        <div>
                            {auth.user.username ? (
                                <CreateCommentView
                                    articleSlug={
                                        this.props.match.params.articleSlug
                                    }
                                />
                            ) : (
                                ''
                            )}
                        </div>
                        <hr className="comment__boundary"/>
                        <div>
                            <div className="container">
                                <div className="row">

                                    {article.comments ? (
                                        <div>
                                            {article.comments.map(comment => (
                                                <CommentItem
                                                    key={comment._id}
                                                    article={article}
                                                    auth={auth}
                                                    comment={comment.body}
                                                    commentId={comment._id}
                                                    username={comment.username}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => ({
    dislikeArticle: (articleSlug, history) =>
        dispatch(dislikeArticle(articleSlug, history)),
    likeArticle: (articleSlug, history) =>
        dispatch(likeArticle(articleSlug, history)),
    getArticle: articleSlug => dispatch(getArticle(articleSlug)),
    getCurrentProfile: dispatch(getCurrentProfile()),
    deleteArticle: articleSlug => dispatch(deleteArticle(articleSlug)),
});
GetArticleView.propTypes = {
    getArticle: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    likeArticle: PropTypes.func,
    dislikeArticle: PropTypes.func,
    deleteArticle: PropTypes.func,
};
export const mapStateToProps = state => ({
    article: state.articles.article,
    profile: state.profile,
    auth: state.auth,
    loading: state.articles.loading,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GetArticleView));
