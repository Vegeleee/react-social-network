import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';

const initialState = {
	posts: [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	],
	profile: null,
	status: ''
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: action.newPostText, 
				likesCount: 0
			};

			return ({
				...state,
				posts: [...state.posts, newPost]
			});

		case SET_USER_PROFILE:
			return ({
				...state,
				profile: action.profile
			});

		case SET_STATUS:
			return ({
				...state,
				status: action.status
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

const setStatus = status =>
	({
		type: SET_STATUS,
		status
	});

export const addPost = newPostText =>
	({
		type: ADD_POST,
		newPostText
	});

export const getProfile = userId => async dispatch => {
	const data = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(data));
}

export const getStatus = userId => async dispatch => {
	const data = await profileAPI.getStatus(userId);
	dispatch(setStatus(data));
}

export const updateStatus = status => async dispatch => {
	const data = await profileAPI.updateStatus(status);
	if (data.resultCode === 0) {
		dispatch(setStatus(status))
	}
}

export default profileReducer;