import usersReducer, { InitialState, actions } from './users-reducer'

let state: InitialState

beforeEach(() => {
	state = {
		users: [
			{
				id: 0,
				name: 'Danil 0',
				followed: false,
				photos: { small: null, large: null },
				status: 'Status 0',
			},
			{
				id: 1,
				name: 'Danil 1',
				followed: false,
				photos: { small: null, large: null },
				status: 'Status 1',
			},
			{
				id: 2,
				name: 'Danil 2',
				followed: true,
				photos: { small: null, large: null },
				status: 'Status 2',
			},
			{
				id: 3,
				name: 'Danil 3',
				followed: true,
				photos: { small: null, large: null },
				status: 'Status 3',
			},
		],
		pageSize: 12,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
	}
})

test('Follow success', () => {
	const newState = usersReducer(state, actions.followSuccess(1))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeTruthy()
	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeTruthy()
})

test('Unfollow success', () => {
	const newState = usersReducer(state, actions.unfollowSuccess(3))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeFalsy()
	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeFalsy()
})
