import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { profileAPI } from '../../api/api';


class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = this.props.match.params.userId || 2;
		
		profileAPI.getProfile(userId)
			.then(data => {
				this.props.setUserProfile(data);
			});
	}

 render () {
	 return (
		 <Profile {...this.props} profile={this.props.profile} />
	 );
 }
};

const mapStateToProps = state =>
	({
		profile: state.profilePage.profile
	});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);