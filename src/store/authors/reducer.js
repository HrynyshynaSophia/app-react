import { SET_AUTHORS, ADD_AUTHOR } from './actionTypes';

const initialState = {
	authorsList: [],
};
const authorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTHORS:
			return {
				...state,
				authorsList: action.payload,
			};
		case ADD_AUTHOR:
			return {
				...state,
				authorsList: [...state.authorsList, action.payload],
			};
		default:
			return state;
	}
};
export default authorsReducer;
