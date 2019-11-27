import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = ({dialogsPage, isAuth, sendMessage, updateNewMessageText}) => {

	let dialogsElements = dialogsPage.dialogs 
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
	
	let messagesElements = dialogsPage.messages
		.map(m => <Message message={m.message} key={m.id} id={m.id} />);

	let newMessageElement = React.createRef();

	let onSendMessage = () => {
		sendMessage();
	};

	let onNewMessageTextChange = () => {
		let newText = newMessageElement.current.value;
		updateNewMessageText(newText);
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
					<div>
						<textarea onChange={onNewMessageTextChange}
											ref={newMessageElement}
											value={dialogsPage.newMessageText}
											placeholder="Enter your message" />
					</div>
					<div>
						<button onClick={onSendMessage}>Send</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dialogs;