import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/objectHelpers"
import { userType } from "../types/types"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'

const initialState = {
	users: [] as Array<userType>,
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number> // array of users ids
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case FOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
			})

		case UNFOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
			})

		case SET_USERS:
			return ({
				...state,
				users: action.users
			})

		case SET_CURRENT_PAGE:
			return ({
				...state,
				currentPage: action.currentPage
			})

		case SET_TOTAL_USERS_COUNT:
			return ({
				...state,
				totalUsersCount: action.totalUsersCount
			})

		case TOGGLE_IS_FETCHING:
			return ({
				...state,
				isFetching: action.isFetching
			})

		case TOGGLE_FOLLOWING_PROGRESS:
			return ({
				...state,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId] :
					[state.followingInProgress.filter(id => id !== action.userId)]
			})

		default:
			return state
	}
}

type followSuccessActionType = {
	type: typeof FOLLOW
	userId: number
}

const followSuccess = (userId: number): followSuccessActionType =>
	({
		type: FOLLOW,
		userId
	})

type unfollowSuccessActionType = {
	type: typeof UNFOLLOW
	userId: number
}

const unfollowSuccess = (userId: number): unfollowSuccessActionType =>
	({
		type: UNFOLLOW,
		userId
	})

type setUsersActionType = {
	type: typeof SET_USERS
	users: Array<userType>
}

const setUsers = (users: Array<userType>): setUsersActionType =>
	({
		type: SET_USERS,
		users
	})

type setTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalUsersCount: number
}

const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType =>
	({
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount
	})

type toggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}

const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType =>
	({
		type: TOGGLE_IS_FETCHING,
		isFetching
	})

type toggleFollowingProgressActionType = {
	type: typeof TOGGLE_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}

const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType =>
	({
		type: TOGGLE_FOLLOWING_PROGRESS,
		isFetching,
		userId
	})

type setCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}

export const setCurrentPage = (currentPage: number): setCurrentPageActionType =>
	({
		type: SET_CURRENT_PAGE,
		currentPage
	});

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
	dispatch(toggleIsFetching(true))
	dispatch(setCurrentPage(page))

	const data = await usersAPI.getUsers(page, pageSize)
	dispatch(toggleIsFetching(false))
	dispatch(setUsers(data.items))
	dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
	dispatch(toggleFollowingProgress(true, userId))

	const data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => (dispatch: any) => {
	followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number) => (dispatch: any) => {
	followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer