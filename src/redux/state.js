 let renderEntireTree = () => {};
 
 let state = {
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
};

export const addPost = () => {
	let newPost = {
		id: state.profilePage.posts.length + 1,
		message: state.profilePage.newPostText,
		likesCount: 0
	};

	state.profilePage.posts.push(newPost);
	state.profilePage.newPostText = '';
	renderEntireTree();
};

export const updateNewPostText = (newText) => {
	state.profilePage.newPostText = newText;
	renderEntireTree();
};

export const sendMessage = () => {
	let newMessage = {
		id: state.dialogsPage.messages.length + 1,
		message: state.dialogsPage.newMessageText
	}

	state.dialogsPage.messages.push(newMessage);
	state.dialogsPage.newMessageText = '';
	renderEntireTree();
};

export const updateNewMessageText = (newText) => {
	state.dialogsPage.newMessageText = newText;
	renderEntireTree();
};

export const subscribe = (observer) => {
	renderEntireTree = observer;
};

export default state;