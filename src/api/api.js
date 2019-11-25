import Axios from "axios";

const axiosInstance = Axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '9eaf8a81-439e-4ee6-bdba-3b5b47726656'
	}
});

export const usersAPI = {
	
	getUsers(currentPage = 1, pageSize = 10) {
		return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`, {
			withCredentials: true
		})
		.then(response => response.data)
	}
};

