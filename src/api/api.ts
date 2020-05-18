import { UserType } from './../types/types'
import Axios from 'axios'

export const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '84eace83-6993-4047-89dd-082bc11cda1c',
	},
})

export enum ResultCodes {
	Success = 0,
	Error = 1,
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10,
}

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
	data: D
	resultCode: RC
	messages: Array<string>
}
