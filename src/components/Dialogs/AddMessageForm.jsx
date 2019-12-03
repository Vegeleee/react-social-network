import React from 'react';
import { reduxForm, Field } from 'redux-form';


const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component="textarea" name="newMessage" placeholder="Enter your message" />
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	);
};

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default AddMessageReduxForm;