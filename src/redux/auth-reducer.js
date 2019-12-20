import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null // if null, then captcha url is not required
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return ({
				...state,
				...action.payload
			});

		case GET_CAPTCHA_URL_SUCCESS:
			return ({
				...state,
				captchaUrl: action.captchaUrl
			});

		default:
			return state;
	}
};

const setAuthUserData = (userId, email, login, isAuth) =>
	({
		type: SET_USER_DATA,
		payload: { userId, email, login, isAuth }
	});

const getCaptchaUrlSuccess = (captchaUrl) =>
	({
		type: GET_CAPTCHA_URL_SUCCESS,
		captchaUrl
	});

export const getAuthUserData = () => async dispatch => {
	const data = await authAPI.me();
	if (data.resultCode === 0) {
		const {id, email, login} = data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
}

export const login = (email, password, rememberMe, captcha) => async dispatch => {
	const data = await authAPI.login(email, password, rememberMe, captcha);
	if (data.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
			if (data.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
		const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
		dispatch(stopSubmit('login', {_error: message}));
	}
}

export const getCaptchaUrl = () => async dispatch => {
	const data = await securityAPI.getCaptchaUrl();
	const captchaUrl = data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async dispatch => {
	const data = await authAPI.logout();
	if (data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export default authReducer;