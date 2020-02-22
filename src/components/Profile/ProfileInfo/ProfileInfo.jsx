import React, { useState } from 'react'
import classes from './ProfileInfo.module.scss'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

	const [editMode, setEditMode] = useState(false)

	if (!profile) {
		return (
			<div className={classes.preloadWrapper}>
				<Preloader />
			</div>
		)
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0])
		}
	}

	const toEditMode = () => {
		setEditMode(true)
	}

	const onSubmit = (formData) => {
		saveProfile(formData).then(() => {
			setEditMode(false)
		})
	}

	return (
		<div>
			<div className={classes.descBlock}>
				<div className={classes.descBlockLeftCol}>
					<img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt='User' />
					{isOwner && <input type="file" onChange={onMainPhotoSelected} />}
				</div>
				<div className={classes.descBlockRightCol}>
					<div className={classes.head}>
						<h1 className={classes.name}>{profile.fullName}</h1>
						<ProfileStatus status={status} updateStatus={updateStatus} isOwner={isOwner} />
					</div>

					{editMode ?
						<ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} /> :
						<ProfileData profile={profile} isOwner={isOwner} toEditMode={toEditMode} />}
				</div>
			</div>
		</div>
	);
};

const ProfileData = ({ profile, isOwner, toEditMode }) => {
	return (
		<div className={classes.profileData}>
			<div className={classes.profileDataItem}>
				<b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}
			</div>
			{profile.lookingForAJob &&
				<div className={classes.profileDataItem}>
					<b>My skills: </b>{profile.lookingForAJobDescription}
				</div>
			}
			<div className={classes.profileDataItem}>
				<div><b>About me: </b>{profile.aboutMe}</div>
			</div>
			<div className={classes.profileDataItem}>
				<b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
					return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
				})}
			</div>
			{isOwner && <div><button onClick={toEditMode}>Edit</button></div>}
		</div>
	);
}

const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div className={classes.contact}>
			<b>{contactTitle}: </b> {contactValue}
		</div>
	)
}

export default ProfileInfo