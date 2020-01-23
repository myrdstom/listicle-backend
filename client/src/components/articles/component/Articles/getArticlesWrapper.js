import React from 'react';
import getArticles from '../../../../assets/images/articles/getarticles.png';
import { Link } from 'react-router-dom';

const GetArticlesWrapper = props => {
    return (
        <div className="articles__container">
            <div className="row">
                <div className="col-7">
                    <div className="wrapper__image-container">
                        <img
                            className="articles__wrapper"
                            src={getArticles}
                            alt=""
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="wrapper__text-container">
                        <div className="wrapper__text">
                            <h1>LISTICLE</h1>
                            <div>
                                <h3>Where writers meet readers</h3>
                            </div>
                            <div className="aside__login-button">
                                <h3>
                                    {props.auth.isAuthenticated ? (
                                        <button
                                            className="btn btn-outline-primary my-2 my-sm-0"
                                            type="submit"
                                        >
                                            <Link
                                                to="/article"
                                                className="authentication__register--link"
                                            >
                                                {' '}
                                                <span className="small-font">
                                                    Start Writing
                                                </span>
                                            </Link>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-primary my-2 my-sm-0"
                                            type="submit"
                                        >
                                            <Link
                                                to="/login"
                                                className="authentication__login--link"
                                            >
                                                {' '}
                                                <span className="small-font">
                                                    Start Reading
                                                </span>
                                            </Link>
                                        </button>
                                    )}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="labels__row"></div>
            </div>
        </div>
    );
};

export default GetArticlesWrapper;
