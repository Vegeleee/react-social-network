import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
	initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
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

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

const setInitializedSuccess = (): InitializedSuccessActionType => 
	({
		type: INITIALIZED_SUCCESS
	})

export const initializeApp = () => (dispatch: any) => {
	const promise = dispatch(getAuthUserData())
	promise.then(() => {
		dispatch(setInitializedSuccess())
	})
}

export default appReducer