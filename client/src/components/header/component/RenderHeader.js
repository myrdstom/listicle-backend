import React from 'react';
import { Link } from 'react-router-dom';

const RenderHeader = props => {
    const { isAuthenticated, profile, onLogoutClick } = props;

    return (
        <nav className="shadow navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <strong>Listicle</strong>
                </Link>
                <div className="navbar--center">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2 small-font"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                </div>
                <div className="navbar--right">
                    {isAuthenticated && (
                        <div>
                            <img src="" alt="" className="rounded-circle" />
                                <span className="profile-button">
                                    <span id="avatar">
                                        <Link to="/profile">
                                            {isAuthenticated &&
                                            !profile.loading &&
                                            profile.profile !== null &&
                                            profile.profile.avatar ? (
                                                <img
                                                    id="avatar-image-icon"
                                                    src={profile.profile.avatar}
                                                    alt=""
                                                />
                                            ) : (

                                                <i
                                                    id="avatar-icon"
                                                    className="fas fa-user-circle"
                                                />
                                            )}
                                        </Link>
                                    </span>
                                </span>
                                <button
                                    className="btn btn-outline-primary my-2 my-sm-0"
                                    type="submit"
                                >
                                    <Link
                                        to="/"
                                        className="authentication__register--link"
                                        onClick={onLogoutClick}
                                    >
                                        LOGOUT
                                    </Link>
                                </button>

                        </div>
                    )}
                    {!isAuthenticated && (
                        <div>
                            <button
                                className="btn btn-basic my-2 my-sm-0"
                                type="submit"
                            >
                                <Link
                                    to="/login"
                                    className="authentication__login--link"
                                >
                                    {' '}
                                    <span className="small-font">
                                        <strong>LOGIN</strong>
                                    </span>
                                </Link>
                            </button>
                            <button
                                className="btn btn-outline-primary my-2 my-sm-0"
                                type="submit"
                            >
                                <Link
                                    to="/register"
                                    className="authentication__register--link"
                                >
                                    GET STARTED
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default RenderHeader;
