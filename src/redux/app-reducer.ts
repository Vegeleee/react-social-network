import { InferActionTypes, BaseThunkType } from './store'
import { getAuthUserData } from './auth-reducer'

const initialState = {
	initialized: false,
}

const appReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}

		default:
			return state
	}
}

export const actions = {
	setInitializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const),
}

export const initializeApp = (): ThunkType => (dispatch) => {
	const promise = dispatch(getAuthUserData())
	promise.then(() => {
		dispatch(actions.setInitializedSuccess())
	})
}

export default appReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes, void>
