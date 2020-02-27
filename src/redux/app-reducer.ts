import { AppStateType } from './store';
import { getAuthUserData } from "./auth-reducer"
import { ThunkAction } from 'redux-thunk'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
	initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return ({
				...state,
				initialized: true
			})

		default:
			return state
	}
}

type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

const setInitializedSuccess = (): InitializedSuccessActionType => 
	({
		type: INITIALIZED_SUCCESS
	})

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => (dispatch) => {
	const promise = dispatch(getAuthUserData())
	promise.then(() => {
		dispatch(setInitializedSuccess())
	})
}

export default appReducer