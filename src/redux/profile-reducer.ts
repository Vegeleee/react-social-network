import { AppStateType } from './store';
import { ThunkAction } from 'redux-thunk';
import { profileAPI, ResultCodes } from "../api/api"
import { stopSubmit } from "redux-form"
import { PostType, ProfileType, PhotosType } from "../types/types"

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

const initialState = {
	posts: [
		{ id: 1, message: 'Hi', likesCount: 12 },
		{ id: 2, message: 'How are you', likesCount: 11 },
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
				profile: { ...state.profile, photos: action.photos } as ProfileType
			})

		default:
			return state
	}
}

type ActionsTypes = SetUserProfileActionType | SetStatusActionType |
	SavePhotoSuccessActionType | AddPostActionType

type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>
	({
		type: SET_USER_PROFILE,
		profile
	})

type SetStatusActionType = {
	type: typeof SET_STATUS
	status: string
}

const setStatus = (status: string): SetStatusActionType =>
	({
		type: SET_STATUS,
		status
	})

type SavePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType
}

const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType =>
	({
		type: SAVE_PHOTO_SUCCESS,
		photos
	})

type AddPostActionType = {
	type: typeof ADD_POST
	newPostText: string
}

export const addPost = (newPostText: string): AddPostActionType =>
	({
		type: ADD_POST,
		newPostText
	})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	try {
		const data = await profileAPI.updateStatus(status)

		if (data.resultCode === ResultCodes.Success) {
			dispatch(setStatus(status))
		}
	} catch (error) {
		// handle error
	}
}

export const savePhoto = (photo: any): ThunkType => async (dispatch) => {
	const data = await profileAPI.savePhoto(photo)
	if (data.resultCode === ResultCodes.Success) {
		dispatch(savePhotoSuccess(data.data.photos))
	}
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId
	const data = await profileAPI.saveProfile(profileData)
	if (data.resultCode === ResultCodes.Success) {
		dispatch(getProfile(userId))
	} else {
		dispatch(stopSubmit('edit-profile-data', { "contacts": {[data.messages[0].slice(30, -1).toLowerCase()]: data.messages[0]} }))
		return Promise.reject(data.messages[0])
	}
}

export default profileReducer