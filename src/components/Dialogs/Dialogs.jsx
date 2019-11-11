import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {

	let dialogsElements = props.dialogsPage.dialogs 
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
	
	let messagesElements = props.dialogsPage.messages
		.map(m => <Message message={m.message} key={m.id} id={m.id} />);

	let newMessageElement = React.createRef();

	let onSendMessage = () => {
		props.sendMessage();
	};

	let onNewMessageTextChange = () => {
		let newText = newMessageElement.current.value;
		props.updateNewMessageText(newText);
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
											value={props.dialogsPage.newMessageText}
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