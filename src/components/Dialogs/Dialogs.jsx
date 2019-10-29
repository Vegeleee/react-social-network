import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {

	let dialogs  = [
		{id: 1, name: 'Danil'},
		{id: 2, name: 'Slava'},
		{id: 3, name: 'Maria'},
		{id: 4, name: 'Sasha'},
		{id: 5, name: 'Aleksey'},
		{id: 6, name: 'Vlad'}
	];

	let messages = [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How are you'},
		{id: 3, message: 'Yo!'},
		{id: 4, message: 'Yo!'},
		{id: 5, message: 'Yo!'}
	];

	let dialogsElements = dialogs 
		.map(d => <DialogItem name={d.name} id={d.id} />);
	
	let messagesElements = messages
		.map(m => <Message message={m.message} id={m.id} />);

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				{dialogsElements}
			</div>
			<div className={classes.messages}>
				{messagesElements}
			</div>
		</div>
	);
};

export default Dialogs;