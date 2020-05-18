import { securityAPI } from './../api/security-api'
import { authAPI } from './../api/auth-api'
import { InferActionTypes, BaseThunkType } from './store'
import { ResultCodes, ResultCodeForCaptcha } from '../api/api'
import { stopSubmit, FormAction } from 'redux-form'

const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null, // if null, then captcha url is not required
}

const authReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state,
				...action.payload,
			}

		case 'auth/GET_CAPTCHA_URL_SUCCESS':
			return {
				...state,
				captchaUrl: action.captchaUrl,
			}

		default:
			return state
	}
}

export const actions = {
	setAuthUserData: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: 'auth/SET_USER_DATA',
			payload: { userId, email, login, isAuth },
		} as const),
	getCaptchaUrlSuccess: (captchaUrl: string) =>
		({
			type: 'auth/GET_CAPTCHA_URL_SUCCESS',
			captchaUrl,
		} as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
	const data = await authAPI.me()
	if (data.resultCode === ResultCodes.Success) {
		const { id, email, login } = data.data
		dispatch(actions.setAuthUserData(id, email, login, true))
	}
}

export const login = (
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string
): ThunkType => async (dispatch) => {
	const data = await authAPI.login(email, password, rememberMe, captcha)
	if (data.resultCode === ResultCodes.Success) {
		dispatch(getAuthUserData())
	} else {
		if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
			dispatch(getCaptchaUrl())
		}
		const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
		dispatch(stopSubmit('login', { _error: message }))
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
	const data = await authAPI.logout()
	if (data.resultCode === ResultCodes.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false))
	}
}

export default authReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
