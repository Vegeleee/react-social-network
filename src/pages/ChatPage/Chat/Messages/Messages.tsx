import React, { useEffect, useState } from 'react'

import { Message } from './Message/Message'

import { ChatMessageType, ws } from '../Chat'

export const Messages: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])

	useEffect(() => {
		ws.addEventListener('message', (e: MessageEvent) => {
			const newMessages = JSON.parse(e.data)
			setMessages((prevMessages) => [...prevMessages, ...newMessages])
		})
	}, [])

	return (
		<div style={{ height: '400px', overflowY: 'auto' }}>
			{messages.map((m: ChatMessageType, index) => (
				<Message key={index} message={m} />
			))}
		</div>
	)
}
