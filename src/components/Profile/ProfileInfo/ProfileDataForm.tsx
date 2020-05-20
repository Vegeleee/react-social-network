import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls'
import classes from './ProfileInfo.module.scss'
import style from './../../common/FormsControls/FormsControls.module.scss'
import { ProfileType } from '../../../types/types'

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
	profile,
	handleSubmit,
	error,
}) => {
	return (
		<form onSubmit={handleSubmit} className={classes.profileData}>
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div className={classes.profileDataItem}>
				<b>Full name: </b>{' '}
				{createField<ProfileDataKeysType>('Full name', 'fullName', [], Input, {
					type: 'text',
				})}
			</div>
			<div className={classes.profileDataItem}>
				<b>Looking for a job: </b>{' '}
				{createField<ProfileDataKeysType>('', 'lookingForAJob', [], Input, {
					type: 'checkbox',
				})}
			</div>
			<div className={classes.profileDataItem}>
				<b>My skills: </b> {createField<ProfileDataKeysType>('Description', 'lookingForAJobDescription', [], Textarea)}
			</div>
			<div className={classes.profileDataItem}>
				<b>About me: </b> {createField<ProfileDataKeysType>('About me', 'aboutMe', [], Textarea)}
			</div>
			{
				<div className={classes.profileDataItem}>
					<b>Contacts: </b>
					{Object.keys(profile.contacts).map((key) => {
						return (
							<div key={key} className={classes.contact}>
								<b>{key}: </b>{' '}
								{createField(key, 'contacts.' + key, [], Input, {
									type: 'text',
								})}
							</div>
						)
					})}
				</div>
			}
			<div>
				<button>Save</button>
			</div>
		</form>
	)
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
	form: 'edit-profile-data',
})(ProfileDataForm)

export default ProfileDataFormReduxForm

type PropsType = {
	profile: ProfileType
}
type ProfileDataKeysType = Extract<keyof ProfileType, string>
