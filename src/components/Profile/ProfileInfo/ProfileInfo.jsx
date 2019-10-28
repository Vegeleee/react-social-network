import React from 'react';
import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
	return (
		<div>
			<div>
				<img src='http://www.sandybeachinternational.com/wp-content/uploads/2018/11/cropped-beach-exotic-holiday-248797.jpg' />
			</div>
			<div className={classes.descriptionBlock}>
				ava + desc
			</div>
		</div>
	);
};

export default ProfileInfo;