import { FETCH_CURRENT_USER, LOGIN } from './actionTypes';
import { LOGOUT } from './actionTypes';
const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	role: '',
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isAuth: true,
				token: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		case FETCH_CURRENT_USER:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
			};
		default:
			return state;
	}
};
export default userReducer;
