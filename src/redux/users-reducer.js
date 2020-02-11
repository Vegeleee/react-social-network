import { usersAPI } from "../api/api";
import { updateObjectInArray } from "./../utils/objectHelpers"

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
	users: [],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
			});

		case UNFOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
			});

		case SET_USERS:
			return ({
				...state,
				users: action.users
			});

		case SET_CURRENT_PAGE:
			return ({
				...state,
				currentPage: action.currentPage
			});

		case SET_TOTAL_USERS_COUNT:
			return ({
				...state,
				totalUsersCount: action.totalUsersCount
			});

		case TOGGLE_IS_FETCHING:
			return ({
				...state,
				isFetching: action.isFetching
			});

		case TOGGLE_FOLLOWING_PROGRESS:
			return ({
				...state,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId] :
					[state.followingInProgress.filter(id => id !== action.userId)]
			});

		default:
			return state;
	}
};

const followSuccess = userId =>
	({
		type: FOLLOW,
		userId
	});

const unfollowSuccess = userId =>
	({
		type: UNFOLLOW,
		userId
	});

const setUsers = users =>
	({
		type: SET_USERS,
		users
	});

const setTotalUsersCount = totalUsersCount =>
	({
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount
	});

const toggleIsFetching = isFetching =>
	({
		type: TOGGLE_IS_FETCHING,
		isFetching
	});

const toggleFollowingProgress = (isFetching, userId) =>
	({
		type: TOGGLE_FOLLOWING_PROGRESS,
		isFetching,
		userId
	});

export const setCurrentPage = currentPage =>
	({
		type: SET_CURRENT_PAGE,
		currentPage
	});

export const requestUsers = (page, pageSize) => async dispatch => {
	dispatch(toggleIsFetching(true));
	dispatch(setCurrentPage(page));

	const data = await usersAPI.getUsers(page, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));

	const data = await apiMethod(userId);
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = userId => dispatch => {
	followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}

export const unfollow = userId => dispatch => {
	followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;