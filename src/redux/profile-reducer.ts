import { profileAPI } from './../api/profile-api'
import { InferActionTypes, BaseThunkType } from './store'
import { ResultCodes } from '../api/api'
import { stopSubmit, FormAction } from 'redux-form'
import { PostType, ProfileType, PhotosType } from '../types/types'

const initialState = {
	posts: [
		{ id: 1, message: 'Hi', likesCount: 12 },
		{ id: 2, message: 'How are you', likesCount: 11 },
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: '',
}

const profileReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'profile/ADD_POST':
			let newPost = {
				id: state.posts.length + 1,
				message: action.newPostText,
				likesCount: 0,
			}

			return {
				...state,
				posts: [...state.posts, newPost],
			}

		case 'profile/SET_USER_PROFILE':
			return {
				...state,
				profile: action.profile,
			}

		case 'profile/SET_STATUS':
			return {
				...state,
				status: action.status,
			}

		case 'profile/SAVE_PHOTO_SUCCESS':
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as ProfileType,
			}

		default:
			return state
	}
}

export const actions = {
	setUserProfile: (profile: ProfileType) =>
		({
			type: 'profile/SET_USER_PROFILE',
			profile,
		} as const),
	setStatus: (status: string) =>
		({
			type: 'profile/SET_STATUS',
			status,
		} as const),
	savePhotoSuccess: (photos: PhotosType) =>
		({
			type: 'profile/SAVE_PHOTO_SUCCESS',
			photos,
		} as const),
	addPost: (newPostText: string) =>
		({
			type: 'profile/ADD_POST',
			newPostText,
		} as const),
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getProfile(userId)
	dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getStatus(userId)
	dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	try {
		const data = await profileAPI.updateStatus(status)

		if (data.resultCode === ResultCodes.Success) {
			dispatch(actions.setStatus(status))
		}
	} catch (error) {
		// handle error
	}
}

export const savePhoto = (photo: any): ThunkType => async (dispatch) => {
	const data = await profileAPI.savePhoto(photo)
	if (data.resultCode === ResultCodes.Success) {
		dispatch(actions.savePhotoSuccess(data.data.photos))
	}
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (
	dispatch,
	getState
) => {
	const userId = getState().auth.userId
	const data = await profileAPI.saveProfile(profileData)
	if (data.resultCode === ResultCodes.Success) {
		if (userId) {
			dispatch(getProfile(userId))
		}
	} else {
		dispatch(
			stopSubmit('edit-profile-data', {
				contacts: {
					[data.messages[0].slice(30, -1).toLowerCase()]: data.messages[0],
				},
			})
		)
		return Promise.reject(data.messages[0])
	}
}

export default profileReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
