import { renderEntireTree } from "../render";

let state = {
	profilePage: {
		posts: [
			{id: 1, message: 'Hi', likesCount: 12},
			{id: 2, message: 'How are you', likesCount: 11},
		]
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
		]
	}
};

export let addPost = (postText) => {
	let newPost = {
		id: state.profilePage.posts.length + 1,
		message: postText,
		likesCount: 0
	};

	state.profilePage.posts.push(newPost);

	renderEntireTree(state);
};

export default state;