import React from 'react';
import login from '../../../assets/images/auth/login.png';

export default function Login(props) {
    return (
        <div>
            <div>
                <div className="parent__authentication__container container-fluid">
                    <div className="row">
                        <div className="col-7">
                            <div className="image__container">
                                <img
                                    className="authentication__image"
                                    src={login}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-5 authentication__aside">
                            <div className="authentication__container">
                                <h1>Welcome back</h1>
                                <form noValidate onSubmit={props.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            name="email"
                                            placeholder="Enter email"
                                            value={props.email}
                                            onChange={props.onChange}
                                            id="email"
                                            required
                                        />
                                        {props.errors.email && (
                                            <div className="error-message">
                                                {props.errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            name="password"
                                            placeholder="Password"
                                            value={props.password}
                                            onChange={props.onChange}
                                            required
                                        />
                                        {!props.errors.email
                                            ? props.errors.password && (
                                                  <div className="error-message">
                                                      {props.errors.password}
                                                  </div>
                                              )
                                            : ''}
                                    </div>
                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
