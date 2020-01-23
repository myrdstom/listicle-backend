import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../../assets/images/articles/default.jpg';

const Article = props => {
    const { article, auth, onHandleLike, onDeleteClick, onHandleDislike, likedStatus, dislikedStatus } = props;
    return (
        <div className="container">
            <div className="row">
                <span id="article__title" className="article__title">
                    {article.author}
                </span>
                {auth.user.username === article.author ? (
                    <span className="article-favicons">
                        <Link
                            to={{
                                pathname: `/article/${article.articleSlug}/edit/`,
                            }}
                        >
                            <i className="fa fa-pencil edit-article"/>
                        </Link>
                        <Link
                            to={{
                                pathname: `/`,
                            }}
                            onClick = {onDeleteClick}
                        >
                            <i className="fas fa-trash-alt delete-article"/>
                        </Link>
                    </span>
                ) : (
                    <span className="article-favicons"/>
                )}

                <img
                    className="article__box-img"
                    src={defaultImage}
                    alt="The article"
                />
                <div className="article__text">
                    <span className="article__title">{article.title}</span>
                    <br />
                    <span className="article__body">{article.body}</span>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="likesar">
                {likedStatus ?
                    <span className="likeBlue"><i className="fa fa-thumbs-o-up fa-2x like-icon"
                                              onClick={onHandleLike} style={{color: "blue"}}/> </span>
                    :
                    <span className="like"><i className="fa fa-thumbs-o-up fa-2x like-icon"
                    onClick={onHandleLike}/></span>
                }
                &nbsp; &nbsp; &nbsp;
                { dislikedStatus ?
                    <span className="dislikeBlue"><i className="fa fa-thumbs-o-down fa-2x dislike-icon" onClick={onHandleDislike} style={{color: "blue"}}/></span>
                    :
                    <span className="dislike"><i className="fa fa-thumbs-o-down fa-2x dislike-icon" onClick={onHandleDislike}/></span>

                }
            </div>
        </div>
    );
};

export default Article;
