import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from '../component/Login';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/auth/auth';

export class LoginView extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors });
            setTimeout(() => {
                this.setState({errors: 'false'});
            }, 5000)
        }

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        const { loginUser } = this.props;
        loginUser(userData);
    };

    render() {
        const { email, password, errors } = this.state;

        const { user } = this.props.auth;
        return (
            <Login
                email={email}
                password={password}
                errors={errors}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                user={user}
            />
        );
    }
}

export const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData)),
});
LoginView.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginView));
