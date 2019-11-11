const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

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
	],
	newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case (SEND_MESSAGE):
			let newMessage = {
				id: state.messages.length + 1,
				message: state.newMessageText
			}

			let messages = [...state.messages];
			messages.push(newMessage);

			return ({
				...state,
				messages,
				newMessageText: ''
			});
		
		case (UPDATE_NEW_MESSAGE_TEXT):
			return ({
				...state,
				newMessageText: action.newText
			});

		default:
			return state;
	}
 };

 export const sendMessageActionCreator = () =>
	({
		type: SEND_MESSAGE
	});

	export const updateNewMessageTextActionCreator = (text) =>
	({
		type: UPDATE_NEW_MESSAGE_TEXT,
		newText: text
	});

 export default dialogsReducer;