import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {

	let dialogsElements = props.dialogsPage.dialogs 
		.map(d => <DialogItem name={d.name} id={d.id} />);
	
	let messagesElements = props.dialogsPage.messages
		.map(m => <Message message={m.message} id={m.id} />);

	let newMessageElement = React.createRef();

	let sendMessage = () => {
		props.sendMessage(props.dialogsPage.newMessageText);
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
				{messagesElements}
				<div>
					<textarea onChange={onNewMessageTextChange} ref={newMessageElement} value={props.dialogsPage.newMessageText} />
				</div>
				<div>
					<button onClick={sendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
};

export default Dialogs;