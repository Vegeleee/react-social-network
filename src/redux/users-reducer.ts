import { AppStateType } from './store';
import { usersAPI, ResultCodes } from "../api/api"
import { updateObjectInArray } from "../utils/objectHelpers"
import { UserType } from "../types/types"
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'

const initialState = {
	users: [] as Array<UserType>,
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number> // array of users ids
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case FOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
			})

		case UNFOLLOW:
			return ({
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
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
					state.followingInProgress.filter(id => id !== action.userId)
			})

		default:
			return state
	}
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
	SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType |
	SetCurrentPageActionType

type FollowSuccessActionType = {
	type: typeof FOLLOW
	userId: number
}

const followSuccess = (userId: number): FollowSuccessActionType =>
	({
		type: FOLLOW,
		userId
	})

type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW
	userId: number
}

const unfollowSuccess = (userId: number): UnfollowSuccessActionType =>
	({
		type: UNFOLLOW,
		userId
	})

type SetUsersActionType = {
	type: typeof SET_USERS
	users: Array<UserType>
}

const setUsers = (users: Array<UserType>): SetUsersActionType =>
	({
		type: SET_USERS,
		users
	})

type SetTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalUsersCount: number
}

const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType =>
	({
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount
	})

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}

const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType =>
	({
		type: TOGGLE_IS_FETCHING,
		isFetching
	})

type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}

const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType =>
	({
		type: TOGGLE_FOLLOWING_PROGRESS,
		isFetching,
		userId
	})

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType =>
	({
		type: SET_CURRENT_PAGE,
		currentPage
	});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType =>
	async (dispatch) => {
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(page))

		const data = await usersAPI.getUsers(page, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
	}

const _followUnfollowFlow = async (dispatch: DispatchType,
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
	dispatch(toggleFollowingProgress(true, userId))

	const data = await apiMethod(userId)
	if (data.resultCode === ResultCodes.Success) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer