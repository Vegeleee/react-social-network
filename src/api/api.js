import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '9eaf8a81-439e-4ee6-bdba-3b5b47726656'
	}
});

export const authAPI = {

	authMe() {
		return instance.get('auth/me')
			.then(response => response.data)
	}
};

export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data)
	},

	follow(userId) {
		return instance.post(`follow/${userId}`)
			.then(response => response.data)
	},

	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
			.then(response => response.data)
	}	
};

export const profileAPI = {

	getProfile(userId) {
		return instance.get(`profile/${userId}`)
			.then(response => response.data)
	}
};