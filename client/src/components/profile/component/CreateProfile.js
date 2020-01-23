import React from 'react';
import avatar from '../../../assets/images/avatar.png';

function CreateProfile(props) {
    const {
        bio,
        firstName,
        lastName,
        errors,
        onSubmit,
        onChange,
        onMouseClick,
    } = props;

    return (
        <div className="create__profile-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 float-left">
                        <div className="avatar-upload">
                            <div className="avatar-preview">
                                {props.avatar ? (
                                    <img
                                        className="profile__avatar"
                                        src={props.avatar}
                                        onClick={onMouseClick}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        className="profile__avatar"
                                        src={avatar}
                                        onClick={onMouseClick}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="icon">
                                <div
                                    className="camera4"
                                    onClick={onMouseClick}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-8 float-right">
                        <form
                            noValidate
                            onSubmit={onSubmit}
                        >
                            <h1 className="update__profile text-center">
                                Update Your Profile
                            </h1>
                            <h2>
                                {' '}
                                <p className="lead text-center">
                                    Let's make your profile awesome!!
                                </p>
                            </h2>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control profile__input"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChange}
                                    id="firstName"
                                    required
                                />
                                {props.errors.firstName && (
                                    <div className="error-message">
                                        {errors.firstName}
                                    </div>
                                )}
                                <br />
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control profile__input"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChange}
                                    id="lastName"
                                    required
                                />
                                {props.errors.lastName && (
                                    <div className="error-message">
                                        {errors.lastName}
                                    </div>
                                )}
                                <br />
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    type="text"
                                    className="form-control profile__input"
                                    name="bio"
                                    value={bio}
                                    onChange={props.onChange}
                                    id="bio"
                                />
                                {props.errors.bio && (
                                    <div className="error-message">
                                        {errors.bio}
                                    </div>
                                )}
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary btn-block mt-4"
                                value="Save"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProfile;
