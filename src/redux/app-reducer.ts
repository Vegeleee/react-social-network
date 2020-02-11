import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
	initialized: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return ({
				...state,
				initialized: true
			});

		default:
			return state;
	}
};

type InitializedSuccessType = {
	type: typeof INITIALIZED_SUCCESS;
}

const setInitializedSuccess = () => {
	const action: InitializedSuccessType = {
		type: INITIALIZED_SUCCESS
	}

	return action;
};

export const initializeApp = () => dispatch => {
	const promise = dispatch(getAuthUserData());
	promise.then(() => {
		dispatch(setInitializedSuccess());
	});
}

export default appReducer;