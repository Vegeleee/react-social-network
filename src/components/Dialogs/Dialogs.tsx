import React from 'react'
import classes from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import AddMessageReduxForm, {
	NewMessageFormType,
} from './AddMessageForm/AddMessageForm'
import { DialogsInitialStateType } from '../../redux/dialogs-reducer'

const Dialogs: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {
	const dialogsElements = dialogsPage.dialogs.map((d) => (
		<DialogItem name={d.name} key={d.id} id={d.id} />
	))

	const messagesElements = dialogsPage.messages.map((m) => (
		<Message message={m.message} key={m.id} id={m.id} />
	))

	const addNewMessage = (formData: NewMessageFormType) => {
		sendMessage(formData.newMessage)
	}

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>{dialogsElements}</div>
			<div className={classes.dialogsMessages}>
				<div>{messagesElements}</div>
				<div>
					<AddMessageReduxForm onSubmit={addNewMessage} />
				</div>
			</div>
		</div>
	)
}

export default Dialogs

type PropsType = {
	dialogsPage: DialogsInitialStateType
	sendMessage: (message: string) => void
}
