import React from 'react'
import classes from './Message.module.scss'


type PropsType = {
	id: number
	message: string
}

const Message: React.FC<PropsType> = ({ message }) => {
	return (
		<div className={classes.message}>
			<span className={classes.messageText}>{message}</span>
		</div>
	)
}

export default Message