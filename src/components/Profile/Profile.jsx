import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
	return (
		<section>
			<div>
				<img src='http://www.sandybeachinternational.com/wp-content/uploads/2018/11/cropped-beach-exotic-holiday-248797.jpg' />
			</div>
			<div>
				ava + desc
			</div>
			<MyPosts />
		</section>
	);
};

export default Profile;