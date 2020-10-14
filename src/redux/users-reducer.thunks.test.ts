import { APIResponseType, ResultCodes } from './../api/api'
import { follow, actions, unfollow } from './users-reducer'
import { usersAPI } from './../api/users-api'

jest.mock('./../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
	resultCode: ResultCodes.Success,
	messages: [],
	data: {},
}

const dispatch = jest.fn()
const getState = jest.fn()

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

beforeEach(() => {
	dispatch.mockClear()
	getState.mockClear()
	usersAPIMock.follow.mockClear()
	usersAPIMock.unfollow.mockClear()
})

test('Success follow thunk', async () => {
	const thunk = follow(1)

	await thunk(dispatch, getState, {})

	expect(dispatch).toBeCalledTimes(3)
	expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatch).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
	expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('Success unfollow thunk', async () => {
	const thunk = unfollow(1)

	await thunk(dispatch, getState, {})

	expect(dispatch).toBeCalledTimes(3)
	expect(dispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
	expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
