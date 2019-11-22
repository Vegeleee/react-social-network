import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile}) => {
	return (
		<section>
			<ProfileInfo profile={profile} />
			<MyPostsContainer />
		</section>
	);
};

export default Profile;