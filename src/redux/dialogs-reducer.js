const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
	switch (action.type) {
		case (SEND_MESSAGE):
			let newMessage = {
				id: state.messages.length + 1,
				message: state.newMessageText
			}

			let messages = state.messages;
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