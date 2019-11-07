const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: 'Hi', likesCount: 12},
				{id: 2, message: 'How are you', likesCount: 11},
			],
			newPostText: "Wubba lubba dub dub!"
		},
		dialogsPage: {
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
			newMessageText: 'Hello!'
		}
	},

	getState() {
		return this._state;
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	},

	_addPost() {
		let newPost = {
			id: this._state.profilePage.posts.length + 1,
			message: this._state.profilePage.newPostText,
			likesCount: 0
		};
	
		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubscriber(this._state);
	},

	_updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},

	_sendMessage() {
		let newMessage = {
			id: this._state.dialogsPage.messages.length + 1,
			message: this._state.dialogsPage.newMessageText
		}
	
		this._state.dialogsPage.messages.push(newMessage);
		this._state.dialogsPage.newMessageText = '';
		this._callSubscriber(this._state);
	},

	_updateNewMessageText(newText) {
		this._state.dialogsPage.newMessageText = newText;
		this._callSubscriber(this._state);
	},

	dispatch(action) {
		if (action.type == ADD_POST) {
			this._addPost();
		} else if (action.type == UPDATE_NEW_POST_TEXT) {
			this._updateNewPostText(action.newText);
		} else if (action.type == SEND_MESSAGE) {
			this._sendMessage();
		} else if (action.type == UPDATE_NEW_MESSAGE_TEXT) {
			this._updateNewMessageText(action.newText);
		}
	}
};

export const addPostActionCreator = () =>
	({
		type: ADD_POST
	});

export const updateNewPostTextActionCreator = (text) =>
	({
		type: UPDATE_NEW_POST_TEXT,
		newText: text
	});

export const sendMessageActionCreator = () =>
	({
		type: SEND_MESSAGE
	});

	export const updateNewMessageTextActionCreator = (text) =>
	({
		type: UPDATE_NEW_MESSAGE_TEXT,
		newText: text
	});

export default store;
window.store = store;