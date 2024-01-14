import { FETCH_CURRENT_USER } from './actionTypes';
import { logout } from './actionCreators';
import { login } from './actionCreators';
export const fetchCurrentUser = (token) => async (dispatch, getState) => {
	try {
		if (token) {
			const response = await fetch('http://localhost:4000/users/me', {
				headers: {
					Authorization: token,
				},
			});
			const { result } = await response.json();
			dispatch({
				type: FETCH_CURRENT_USER,
				payload: result,
			});
		}
	} catch (error) {
		console.error(error);
	}
};
export const logoutUser = (token) => async (dispatch) => {
	await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
	localStorage.removeItem('token');
	dispatch(logout());
};
export const loginUser = (email, password) => async (dispatch) => {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const { result } = await response.json();
	if (response.ok) {
		localStorage.setItem('token', result);
		dispatch(login(result));
		dispatch(fetchCurrentUser());
	} else {
		alert('Sorry, your password or email was incorrect. Please try again');
	}
};
