import React from 'react';
import classes from './Message.module.scss';

const Message = (props) => {
	return (
		<div className={classes.message}>
			<span className={classes.messageText}>{props.message}</span>
		</div>
	);
};

export default Message;