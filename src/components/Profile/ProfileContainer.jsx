import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';


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

const mapStateToProps = state =>
	({
		profile: state.profilePage.profile
	});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);