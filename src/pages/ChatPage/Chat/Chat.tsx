import React from 'react'

import { AddChatMessageForm } from './AddChatMessageForm/AddChatMessageForm'
import { Messages } from './Messages/Messages'

export const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}

export const Chat: React.FC = () => {
	return (
		<div>
			<Messages />
			<AddChatMessageForm />
		</div>
	)
}
