import { ProfileType, UserType } from './../types/types';
import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '84eace83-6993-4047-89dd-082bc11cda1c'
	}
});

export enum ResultCodes {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

type MeResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodes
	messages: Array<string>
}

type LoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodes | ResultCodeForCaptcha
	messages: Array<string>
}

type LogoutResponseType = {
	data: {}
	resultCode: ResultCodes
	messages: Array<string>
}

export const authAPI = {

	me() {
		return instance.get<MeResponseType>('auth/me')
			.then(response => response.data)
	},

	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
			.then(response => response.data)
	},

	logout() {
		return instance.delete<LogoutResponseType>('auth/login')
			.then(response => response.data)
	}
};

type GetUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}

type FollowUnfollowResponseType = {
	resultCode: ResultCodes
	messages: Array<string>
	data: {}
}

export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data)
	},

	follow(userId: number) {
		return instance.post<FollowUnfollowResponseType>(`follow/${userId}`)
			.then(response => response.data)
	},

	unfollow(userId: number) {
		return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
			.then(response => response.data)
	}	
};

type UpdateStatusResponseType = {
	resultCode: ResultCodes
	messages: Array<string>
	data: {}
}

type SaveProfileResponseType = {
	resultCode: ResultCodes
	messages: Array<string>
	data: {}
}

export const profileAPI = {

	async getProfile(userId: number) {
		return instance.get<ProfileType>(`profile/${userId}`)
			.then(response => response.data)
	},

	getStatus(userId: number) {
		return instance.get<string>(`profile/status/${userId}`)
			.then(response => response.data);
	},

	updateStatus(status: string) {
		return instance.put<UpdateStatusResponseType>(`profile/status/`, {status})
			.then(response => response.data);
	},

	savePhoto(photo: any) {
		const formData = new FormData();
		formData.append('image', photo);

		return instance.put(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => response.data);
	},

	saveProfile(profileData: ProfileType) {
		return instance.put<SaveProfileResponseType>(`profile`, profileData)
			.then(response => response.data);
	}
};

export const securityAPI = {

	getCaptchaUrl() {
		return instance.get('security/get-captcha-url')
			.then(response => response.data)
	},
};
