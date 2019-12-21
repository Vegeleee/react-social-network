import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

const initialState = {
	posts: [
		{ id: 1, message: 'Hi', likesCount: 12 },
		{ id: 2, message: 'How are you', likesCount: 11 },
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

		case SAVE_PHOTO_SUCCESS:
			return ({
				...state,
				profile: { ...state.profile, photos: action.photos }
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

const savePhotoSuccess = photos =>
	({
		type: SAVE_PHOTO_SUCCESS,
		photos
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
	try {
		const data = await profileAPI.updateStatus(status);

		if (data.resultCode === 0) {
			dispatch(setStatus(status))
		}
	} catch (error) {
		// handle error
	}
	const data = await profileAPI.updateStatus(status);
	if (data.resultCode === 0) {
		dispatch(setStatus(status))
	}
}

export const savePhoto = photo => async dispatch => {
	const data = await profileAPI.savePhoto(photo);
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos))
	}
}

export const saveProfile = profileData => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const data = await profileAPI.saveProfile(profileData);
	if (data.resultCode === 0) {
		dispatch(getProfile(userId));
	} else {
		dispatch(stopSubmit('edit-profile-data', { "contacts": {[data.messages[0].slice(30, -1).toLowerCase()]: data.messages[0]} }));
		return Promise.reject(data.messages[0]);
	}
}

export default profileReducer;