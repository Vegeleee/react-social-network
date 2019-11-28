import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = ({profile}) => {
	if (!profile) {
		return <Preloader />
	}
	return (
		<div>
			<div className={classes.profileHead}>
				<img src='http://www.sandybeachinternational.com/wp-content/uploads/2018/11/cropped-beach-exotic-holiday-248797.jpg' />
			</div>
			<div className={classes.descriptionBlock}>
				<img src={profile.photos.large}/>
				<ProfileStatus status='Hello' />
			</div>
		</div>
	);
};

export default ProfileInfo;