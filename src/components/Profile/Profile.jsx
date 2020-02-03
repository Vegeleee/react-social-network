import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
	return (
		<section>
			<ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile} />
			<MyPostsContainer />
		</section>
	);
};

export default Profile;