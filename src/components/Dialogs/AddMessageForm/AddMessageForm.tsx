import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Textarea, createField } from '../../common/FormsControls/FormsControls'
import { maxLengthCreator } from '../../../utils/validators/validators'
import classes from './AddMessageForm.module.scss'

const maxLength = maxLengthCreator(50)

const AddMessageForm: React.FC<
	InjectedFormProps<NewMessageFormType, PropsType> & PropsType
> = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={classes.form}>
			<div className={classes.formField}>
				{createField<NewMessageKeysType>(
					'Enter your message',
					'newMessage',
					[maxLength],
					Textarea,
					{}
				)}
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

const AddMessageReduxForm = reduxForm<NewMessageFormType, PropsType>({
	form: 'dialogAddMessageForm',
})(AddMessageForm)

export default AddMessageReduxForm

type NewMessageKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
export type NewMessageFormType = {
	newMessage: string
}
