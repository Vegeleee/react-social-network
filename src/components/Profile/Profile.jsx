import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile, status, updateStatus}) => {
	return (
		<section>
			<ProfileInfo profile={profile} status={status} updateStatus={updateStatus} />
			<MyPostsContainer />
		</section>
	);
};

export default Profile;