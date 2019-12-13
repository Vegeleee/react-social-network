import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
	if (!profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		}
	}

	return (
		<div>
			<div className={classes.profileHead}>
				<img src='http://www.sandybeachinternational.com/wp-content/uploads/2018/11/cropped-beach-exotic-holiday-248797.jpg' />
			</div>
			<div className={classes.descriptionBlock}>
				<img src={profile.photos.large || userPhoto} className={classes.mainPhoto}/>
				{ isOwner && <input type="file" onChange={onMainPhotoSelected}/> }
				<ProfileStatus status={status} updateStatus={updateStatus} />
			</div>
		</div>
	);
};

export default ProfileInfo;