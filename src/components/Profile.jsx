import React from 'react';
import classes from './Profile.module.css';

const Profile = () => {
	return (
		<section className={classes.content}>
			<div>
				<img src='http://www.sandybeachinternational.com/wp-content/uploads/2018/11/cropped-beach-exotic-holiday-248797.jpg' />
			</div>
			<div>
				ava + desc
			</div>
			<div>
				my posts
				<div>
					new post
				</div>
				<div className='posts'>
					<div className='item'>
						post 1
					</div>
					<div className='item'>
						post 2
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;