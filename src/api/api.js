import Axios from "axios";

const instance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '84eace83-6993-4047-89dd-082bc11cda1c'
	}
});

export const authAPI = {

	me() {
		return instance.get('auth/me')
			.then(response => response.data)
	},

	login(email, password, rememberMe = false) {
		return instance.post('auth/login', {email, password, rememberMe})
			.then(response => response.data)
	},

	logout() {
		return instance.delete('auth/login')
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

	async getProfile(userId) {
		return instance.get(`profile/${userId}`)
			.then(response => response.data)
	},

	getStatus(userId) {
		return instance.get(`profile/status/${userId}`)
			.then(response => response.data);
	},

	updateStatus(status) {
		return instance.put(`profile/status/`, {status})
			.then(response => response.data);
	},

	savePhoto(photo) {
		const formData = new FormData();
		formData.append('image', photo);

		return instance.put(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => response.data);
	},

	saveProfile(profileData) {
		return instance.put(`profile`, profileData)
			.then(response => response.data);
	}
};