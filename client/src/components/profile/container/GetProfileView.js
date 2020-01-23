import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GetProfile from '../component/GetProfile';
import Loader from '../../Loader';
import { getCurrentProfile } from '../../../redux/actions/profile/profileActions';
import PropTypes from 'prop-types';

class GetProfileView extends Component {
    componentWillMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');

        }
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;


        return (
            <div>
                {profile === null || loading === true ? (
                    <Loader />
                ) : (
                    <GetProfile
                        profile={profile}
                        loading={loading}
                        user={user}
                    />
                )}
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => ({
    getCurrentProfile: dispatch(getCurrentProfile()),
});

GetProfileView.propTypes = {
    getCurrentProfile: PropTypes.func, //Look ito the getCurrentProfile dispatch
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GetProfileView));
