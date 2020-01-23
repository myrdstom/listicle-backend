import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../../assets/images/avatar.png';

function GetProfile(props) {
    const { username, email } = props.user;
    const { bio, firstName, lastName } = props.profile;
    let fullName;
    // eslint-disable-next-line
    {
        !firstName && !lastName
            ? (fullName = '')
            : (fullName = firstName + ' ' + lastName);
    }
    return (
        <div>
            <div className="get__profile-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="col-md-4">
                                <div className="avatar-upload">
                                    <div className="avatar-preview">
                                        {props.profile.avatar ? (
                                            <img
                                                className="profile__avatar"
                                                src={props.profile.avatar }
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="profile__avatar"
                                                src={avatar}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 float-right">
                                <div className="profile__details">
                                    <span>
                                        <strong>{username}</strong>{' '}
                                    </span>
                                    <Link to="/create-profile">
                                        <i className="fa fa-pencil float-right edit_button"></i>
                                    </Link>
                                    <br />
                                    <br />
                                    <ul>
                                        <li>
                                            {}
                                            <i className="fa fa-user"></i>
                                            &nbsp;&nbsp;
                                            <span className="profile__element">
                                                {fullName}
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope-o"></i>
                                            &nbsp;&nbsp;
                                            <span className="profile__element">
                                                {email}
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fa fa-comment"></i>
                                            &nbsp;&nbsp;
                                            <span className="profile__element">
                                                {bio}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetProfile;
