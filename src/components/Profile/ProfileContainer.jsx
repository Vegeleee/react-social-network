import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = this.props.match.params.userId || 5199;

		this.props.getProfile(userId);
		this.props.getStatus(userId)
	}

 render () {
	return (
		 <Profile {...this.props} />
	 );
 }
};

const mapStateToProps = state =>
	({
		profile: state.profilePage.profile,
		status: state.profilePage.status
	});

export default compose(
	connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
	withRouter,
	withAuthRedirect
)(ProfileContainer);