import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import classes from './ProfileInfo.module.scss';
import style from './../../common/FormsControls/FormsControls.module.scss'


const ProfileDataForm = ({ profile, handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit} className={classes.profileData}>
			{error && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div className={classes.profileDataItem}>
				<b>Full name: </b> {createField('Full name', 'fullName', [], Input, {type: 'text'})}
			</div>
			<div className={classes.profileDataItem}>
				<b>Looking for a job: </b> {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
			</div>
			<div className={classes.profileDataItem}>
				<b>My skills: </b> {createField('Description', 'lookingForAJobDescription', [], Textarea)}
			</div>
			<div className={classes.profileDataItem}>
				<b>About me: </b> {createField('About me', 'aboutMe', [], Textarea)}
			</div>
			{<div className={classes.profileDataItem}>
				<b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
					return (
						<div key={key} className={classes.contact}>
							<b>{key}: </b> {createField(key, 'contacts.' + key, [], Input, {type: 'text'})}
						</div>
					);
				})}
			</div>}
			<div><button>Save</button></div>
		</form>
	);
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile-data' })(ProfileDataForm);

export default ProfileDataFormReduxForm;