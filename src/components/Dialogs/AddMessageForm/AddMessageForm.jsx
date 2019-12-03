import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator } from '../../../utils/validators/validators';


const maxLength = maxLengthCreator(50);

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea} name="newMessage" placeholder="Enter your message"
					validate={[maxLength]} />
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	);
};

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default AddMessageReduxForm;