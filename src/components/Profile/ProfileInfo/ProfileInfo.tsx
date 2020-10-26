import React, { useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Preloader from '../../common/Preloader/Preloader'
import { ProfileStatus } from './ProfileStatus'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm'

import { savePhoto } from '../../../redux/profile-reducer'

import { ProfileType, ContactsType } from '../../../types/types'
import { AppStateType } from '../../../redux/store'

import classes from './ProfileInfo.module.scss'

export const ProfileInfo: React.FC<PropsType> = ({ isOwner, saveProfile }) => {
	const [editMode, setEditMode] = useState(false)

	const profile = useSelector((state: AppStateType) => state.profilePage.profile)
	const status = useSelector((state: AppStateType) => state.profilePage.status)

	const dispatch = useDispatch()

	if (!profile) {
		return (
			<div className={classes.preloadWrapper}>
				<Preloader />
			</div>
		)
	}

	const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			dispatch(savePhoto(e.target.files[0]))
		}
	}

	const toEditMode = () => {
		setEditMode(true)
	}

	const onSubmit = (formData: ProfileType) => {
		saveProfile(formData).then(() => {
			setEditMode(false)
		})
	}

	return (
		<div>
			<div className={classes.descBlock}>
				<div className={classes.descBlockLeftCol}>
					<img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt="User" />
					{isOwner && <input type="file" onChange={onMainPhotoSelected} />}
				</div>
				<div className={classes.descBlockRightCol}>
					<div className={classes.head}>
						<h1 className={classes.name}>{profile.fullName}</h1>
						<ProfileStatus status={status} isOwner={isOwner} />
					</div>

					{editMode ? (
						<ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
					) : (
						<ProfileData profile={profile} isOwner={isOwner} toEditMode={toEditMode} />
					)}
				</div>
			</div>
		</div>
	)
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, toEditMode }) => {
	return (
		<div className={classes.profileData}>
			<div className={classes.profileDataItem}>
				<b>Looking for a job: </b>
				{profile.lookingForAJob ? 'Yes' : 'No'}
			</div>
			{profile.lookingForAJob && (
				<div className={classes.profileDataItem}>
					<b>My skills: </b>
					{profile.lookingForAJobDescription}
				</div>
			)}
			<div className={classes.profileDataItem}>
				<div>
					<b>About me: </b>
					{profile.aboutMe}
				</div>
			</div>
			<div className={classes.profileDataItem}>
				<b>Contacts: </b>
				{Object.keys(profile.contacts).map((key) => {
					return (
						<Contact
							key={key}
							contactTitle={key}
							contactValue={profile.contacts[key as keyof ContactsType]}
						/>
					)
				})}
			</div>
			{isOwner && (
				<div>
					<button onClick={toEditMode}>Edit</button>
				</div>
			)}
		</div>
	)
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
	return (
		<div className={classes.contact}>
			<b>{contactTitle}: </b> {contactValue}
		</div>
	)
}

type PropsType = {
	isOwner: boolean
	saveProfile: (profileData: ProfileType) => Promise<any>
}
type ProfileDataPropsType = {
	profile: ProfileType
	isOwner: boolean
	toEditMode: () => void
}
type ContactPropsType = {
	contactTitle: string
	contactValue: string
}
