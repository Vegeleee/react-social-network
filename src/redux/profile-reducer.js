const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
	posts: [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	],
	newPostText: "Wubba lubba dub dub!"
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case (ADD_POST):
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText, 
				likesCount: 0
			};

			return ({
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			});

		case (UPDATE_NEW_POST_TEXT):
			return ({
				...state,
				newPostText: action.newText
			});

		default:
			return state;
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

 export default profileReducer;