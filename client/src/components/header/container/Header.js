import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/auth/auth';
import {
    clearCurrentProfile,
    getCurrentProfile,
} from '../../../redux/actions/profile/profileActions';

import RenderHeader from '../component/RenderHeader';

export class Header extends Component {
    componentDidMount() {
        const { isAuthenticated } = this.props.auth;

        if (isAuthenticated) {
            this.props.getCurrentProfile();
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    };
    render() {
        const { isAuthenticated } = this.props.auth;
        const { profile } = this.props;

        return (
            <div>
                <RenderHeader
                    isAuthenticated={isAuthenticated}
                    profile={profile}
                    onLogoutClick = {this.onLogoutClick}
                />
            </div>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile, getCurrentProfile }
)(Header);
