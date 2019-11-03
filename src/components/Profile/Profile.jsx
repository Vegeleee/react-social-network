import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
	return (
		<section>
			<ProfileInfo />
			<MyPosts posts={props.state.posts} addPost={props.addPost} />
		</section>
	);
};

export default Profile;