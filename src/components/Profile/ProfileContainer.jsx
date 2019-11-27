import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
	componentDidMount() {
		this.props.getProfile(this.props.match.params.userId)
	}

 render () {
	return (
		 <Profile {...this.props} profile={this.props.profile} />
	 );
 }
};

const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = state =>
	({
		profile: state.profilePage.profile
	});

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);