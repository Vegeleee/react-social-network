import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator } from '../../../../utils/validators/validators'
import {
	Textarea,
	createField,
} from '../../../common/FormsControls/FormsControls'

const maxLength = maxLengthCreator(10)

const AddPostForm: React.FC<
	InjectedFormProps<AddPostFormType, PropsType> & PropsType
> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<AddPostKeysType>(
					"What's new?",
					'newPostText',
					[maxLength],
					Textarea,
					{}
				)}
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

const NewPostReduxForm = reduxForm<AddPostFormType, PropsType>({
	form: 'profileAddPostForm',
})(AddPostForm)

export default NewPostReduxForm

type PropsType = {}
export type AddPostFormType = {
	newPostText: string
}
type AddPostKeysType = Extract<keyof AddPostFormType, string>
