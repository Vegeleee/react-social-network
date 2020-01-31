import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import classes from './ProfileInfo.module.scss';
import style from './../../common/FormsControls/FormsControls.module.css'


const ProfileDataForm = ({ profile, handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit}>
			{error && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div><button>Save</button></div>
			<div>
				<b>Full name: </b> {createField('Full name', 'fullName', [], Input, {type: 'text'})}
			</div>
			<div>
				<b>Looking for a job: </b> {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
			</div>
			<div>
				<b>My skills: </b> {createField('Description', 'lookingForAJobDescription', [], Textarea)}
			</div>
			<div>
				<b>About me: </b> {createField('About me', 'aboutMe', [], Textarea)}
			</div>
			{<div>
				<b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
					return (
						<div key={key} className={classes.contact}>
							<b>{key}: </b> {createField(key, 'contacts.' + key, [], Input, {type: 'text'})}
						</div>
					);
				})}
			</div>}
		</form>
	);
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile-data' })(ProfileDataForm);

export default ProfileDataFormReduxForm;