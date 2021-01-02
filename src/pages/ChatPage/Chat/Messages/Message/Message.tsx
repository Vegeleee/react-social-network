import React from 'react'

import { ChatMessageType } from '../../Chat'

export const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
	return (
		<div>
			<img src={message.photo} style={{ width: '30px' }} /> <b>{message.userName}</b>
			<br />
			{message.message}
			<hr />
		</div>
	)
}
