import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";


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
			newMessageText: ''
		}
	},

	getState() {
		return this._state;
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

		this._callSubscriber(this._state);
	}
};

export default store;
window.store = store;