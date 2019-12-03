import React from 'react';
import { reduxForm, Field } from 'redux-form';


const AddPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name="newPostText" component="textarea" placeholder="Enter your text" />
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	);
};

const NewPostReduxForm = reduxForm({form: 'profileAddPostForm'})(AddPostForm);

export default NewPostReduxForm;