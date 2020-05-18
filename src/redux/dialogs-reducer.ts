import { InferActionTypes } from './store'

type DialogType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

const initialState = {
	dialogs: [
		{ id: 1, name: 'Danil' },
		{ id: 2, name: 'Slava' },
		{ id: 3, name: 'Maria' },
		{ id: 4, name: 'Sasha' },
		{ id: 5, name: 'Aleksey' },
		{ id: 6, name: 'Vlad' },
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How are you' },
		{ id: 3, message: 'Yo!' },
		{ id: 4, message: 'Yo!' },
		{ id: 5, message: 'Yo!' },
	] as Array<MessageType>,
}

const dialogsReducer = (
	state = initialState,
	action: ActionsTypes
): DialogsInitialStateType => {
	switch (action.type) {
		case 'dialogs/SEND-MESSAGE':
			const newMessage = {
				id: state.messages.length + 1,
				message: action.newMessage,
			}

			return {
				...state,
				messages: [...state.messages, newMessage],
			}

		default:
			return state
	}
}

export const actions = {
	sendMessage: (newMessage: string) =>
		({
			type: 'dialogs/SEND-MESSAGE',
			newMessage,
		} as const),
}

export default dialogsReducer

export type DialogsInitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
