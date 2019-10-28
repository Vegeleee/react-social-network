import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem = (props) => {
	let path = `/dialogs/${props.id}`;

	return (
		<div className={classes.dialog}>
			<NavLink to={path} activeClassName={classes.active}>{props.name}</NavLink>
		</div>
	);
};

const Message = (props) => {
	return (
		<div className={classes.message}>{props.message}</div>
	);
};

const Dialogs = (props) => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				<DialogItem name='Danil' id='1' />
				<DialogItem name='Slava' id='2' />
				<DialogItem name='Maria' id='3' />
				<DialogItem name='Sasha' id='4' />
				<DialogItem name='Aleksey' id='5' />
				<DialogItem name='Vlad' id='6' />
			</div>
			<div className={classes.messages}>
				<Message message='Hi' />
				<Message message='How are you' />
				<Message message='Yo!' />
			</div>
		</div>
	);
};

export default Dialogs;