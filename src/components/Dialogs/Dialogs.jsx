import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import AddMessageReduxForm from './AddMessageForm';


const Dialogs = ({ dialogsPage, isAuth, sendMessage }) => {

	const dialogsElements = dialogsPage.dialogs
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

	const messagesElements = dialogsPage.messages
		.map(m => <Message message={m.message} key={m.id} id={m.id} />);

	const addNewMessage = (formData) => {
		sendMessage(formData.newMessage);
	};


	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				{dialogsElements}
			</div>
			<div className={classes.messages}>
				<div>
					{messagesElements}
				</div>
				<div>
					<AddMessageReduxForm onSubmit={addNewMessage} />
				</div>
			</div>
		</div>
	);
};

export default Dialogs;