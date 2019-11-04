import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
	return (
		<section>
			<ProfileInfo />
			<MyPosts
				posts={props.profilePage.posts}
				newPostText={props.profilePage.newPostText}
				updateNewPostText={props.updateNewPostText}
				addPost={props.addPost} />
		</section>
	);
};

export default Profile;