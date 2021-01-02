import React, { useState } from 'react'
import { ws } from '../Chat'

export const AddChatMessageForm: React.FC = () => {
	const [message, setMessage] = useState('')

	const sendMessage = () => {
		if (!message) return

		ws.send(message)

		setMessage('')
	}

	return (
		<div>
			<div>
				<textarea
					onChange={({ target: { value } }) => setMessage(value)}
					value={message}
				></textarea>
			</div>
			<div>
				<button onClick={sendMessage}>send</button>
			</div>
		</div>
	)
}
