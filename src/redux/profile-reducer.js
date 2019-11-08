const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {
	switch (action.type) {
		case (ADD_POST):
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText, 
				likesCount: 0
			};
			
			let posts = state.posts;
			posts.push(newPost);

			return ({
				...state,
				posts,
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