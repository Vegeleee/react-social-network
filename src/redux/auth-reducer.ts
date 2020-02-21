import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null // if null, then captcha url is not required
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
			return ({
				...state,
				...action.payload
			})

		case GET_CAPTCHA_URL_SUCCESS:
			return ({
				...state,
				captchaUrl: action.captchaUrl,
			})

		default:
			return state;
	}
}

type SetAuthUserDataActionPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: SetAuthUserDataActionPayloadType
}

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
	({
		type: SET_USER_DATA,
		payload: { userId, email, login, isAuth }
	})

type GetCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	captchaUrl: string
}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
	({
		type: GET_CAPTCHA_URL_SUCCESS,
		captchaUrl
	})

export const getAuthUserData = () => async (dispatch: any) => {
	const data = await authAPI.me()
	if (data.resultCode === 0) {
		const {id, email, login} = data.data
		dispatch(setAuthUserData(id, email, login, true))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
	const data = await authAPI.login(email, password, rememberMe, captcha)
	if (data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {
			if (data.resultCode === 10) {
				dispatch(getCaptchaUrl())
			}
		const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
		dispatch(stopSubmit('login', {_error: message}))
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	const data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url
	dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
	const data = await authAPI.logout()
	if (data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}

export default authReducer