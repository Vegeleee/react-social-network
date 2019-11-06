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

	addPost() {
		let newPost = {
			id: this._state.profilePage.posts.length + 1,
			message: this._state.profilePage.newPostText,
			likesCount: 0
		};
	
		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubscriber(this._state);
	},

	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},

	sendMessage() {
		let newMessage = {
			id: this._state.dialogsPage.messages.length + 1,
			message: this._state.dialogsPage.newMessageText
		}
	
		this._state.dialogsPage.messages.push(newMessage);
		this._state.dialogsPage.newMessageText = '';
		this._callSubscriber(this._state);
	},

	updateNewMessageText(newText) {
		this._state.dialogsPage.newMessageText = newText;
		this._callSubscriber(this._state);
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	}
};

export default store;
window.store = store;