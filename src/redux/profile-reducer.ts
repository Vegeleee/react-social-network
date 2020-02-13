import { profileAPI } from "../api/api"
import { stopSubmit } from "redux-form"
import { postType, profileType, photosType } from "../types/types"

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

const initialState = {
	posts: [
		{ id: 1, message: 'Hi', likesCount: 12 },
		{ id: 2, message: 'How are you', likesCount: 11 },
	] as Array<postType>,
	profile: null as profileType | null,
	status: '',
	newPostText: ''
}

type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: action.newPostText,
				likesCount: 0
			}

			return ({
				...state,
				posts: [...state.posts, newPost]
			})

		case SET_USER_PROFILE:
			return ({
				...state,
				profile: action.profile
			})

		case SET_STATUS:
			return ({
				...state,
				status: action.status
			})

		case SAVE_PHOTO_SUCCESS:
			return ({
				...state,
				profile: { ...state.profile, photos: action.photos } as profileType
			})

		default:
			return state
	}
}

type setUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	profile: profileType
}

const setUserProfile = (profile: profileType): setUserProfileActionType =>
	({
		type: SET_USER_PROFILE,
		profile
	})

type setStatusActionType = {
	type: typeof SET_STATUS
	status: string
}

const setStatus = (status: string): setStatusActionType =>
	({
		type: SET_STATUS,
		status
	})

type savePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: photosType
}

const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType =>
	({
		type: SAVE_PHOTO_SUCCESS,
		photos
	})

type addPostActionType = {
	type: typeof ADD_POST
	newPostText: string
}

export const addPost = (newPostText: string): addPostActionType =>
	({
		type: ADD_POST,
		newPostText
	})

export const getProfile = (userId: number) => async (dispatch: any) => {
	const data = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
	const data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	try {
		const data = await profileAPI.updateStatus(status)

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

export const savePhoto = (photo: any) => async (dispatch: any) => {
	const data = await profileAPI.savePhoto(photo)
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos))
	}
}

export const saveProfile = (profileData: profileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId
	const data = await profileAPI.saveProfile(profileData)
	if (data.resultCode === 0) {
		dispatch(getProfile(userId))
	} else {
		dispatch(stopSubmit('edit-profile-data', { "contacts": {[data.messages[0].slice(30, -1).toLowerCase()]: data.messages[0]} }))
		return Promise.reject(data.messages[0])
	}
}

export default profileReducer