const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
	users: [
		{id: 1, followed: false, fullName: 'Danil', status: 'I am a boss!', location: {city: 'Kaliningrad', country: 'Russia'} },
		{id: 2, followed: true, fullName: 'Vasya', status: 'I am a boss too!', location: {city: 'Moscow', country: 'Russia'} },
		{id: 3, followed: false, fullName: 'Sasha', status: 'I am a boss!', location: {city: 'Minsk', country: 'Belarus'} }
	]
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return ({
				...state,
				users: state.users.map( u =>
					(u.id == action.userId) ?
						({...u, followed: !u.followed}) :
						u
				)
			});

		case UNFOLLOW:
			return ({
				...state,
				users: state.users.map( u =>
					(u.id == action.userId) ?
						({...u, followed: !u.followed}) :
						u
				)
			});

		case SET_USERS:
			return ({
				...state,
				users: action.users
			});

		default:
			return state;
	}
};

export const followAC = userId =>
	({
		type: FOLLOW,
		userId
	});

export const unfollowAC = userId =>
	({
		type: UNFOLLOW,
		userId
	});
export const setUsersAC = users =>
	({
		tupe: SET_USERS,
		users
	});

export default usersReducer;