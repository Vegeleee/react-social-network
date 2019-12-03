import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';


const maxLength = maxLengthCreator(10);

const AddPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name="newPostText" component={Textarea} placeholder="What's new?"
					validate={[required, maxLength]} />
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	);
};

const NewPostReduxForm = reduxForm({form: 'profileAddPostForm'})(AddPostForm);

export default NewPostReduxForm;