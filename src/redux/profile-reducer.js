import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
	posts: [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	],
	newPostText: "Wubba lubba dub dub!",
	profile: null
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
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

		case UPDATE_NEW_POST_TEXT:
			return ({
				...state,
				newPostText: action.newText
			});

		case SET_USER_PROFILE:
			return ({
				...state,
				profile: action.profile
			});

		default:
			return state;
	}
 };

const setUserProfile = profile =>
	({
		type: SET_USER_PROFILE,
		profile
	});

export const addPost = () =>
	({
		type: ADD_POST
	});

export const updateNewPostText = text =>
	({
		type: UPDATE_NEW_POST_TEXT,
		newText: text
	});

export const getProfile = userId => dispatch => {
	const id = userId || 2;
		
	profileAPI.getProfile(id)
		.then(data => {
			dispatch(setUserProfile(data));
		});
}

 export default profileReducer;