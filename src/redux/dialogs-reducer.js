const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
	dialogs: [
		{id: 1, name: 'Danil'},
		{id: 2, name: 'Slava'},
		{id: 3, name: 'Maria'},
		{id: 4, name: 'Sasha'},
		{id: 5, name: 'Aleksey'},
		{id: 6, name: 'Vlad'}
	],
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How are you'},
		{id: 3, message: 'Yo!'},
		{id: 4, message: 'Yo!'},
		{id: 5, message: 'Yo!'}
	]
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			const newMessage = {
				id: state.messages.length + 1,
				message: action.newMessage
			}

			return ({
				...state,
				messages: [...state.messages, newMessage]
			});

		default:
			return state;
	}
};

export const sendMessage = (newMessage) =>
	({
		type: SEND_MESSAGE,
		newMessage
	});

export default dialogsReducer;