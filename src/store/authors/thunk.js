import { ADD_AUTHOR, SET_AUTHORS } from './actionTypes';
export const addAuthor = (author) => async (dispatch, getState) => {
	const token = getState().user.token;
	try {
		const response = await fetch(`http://localhost:4000/authors/add`, {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(author),
		});
		if (response.ok) {
			const { result } = await response.json();
			dispatch({ type: ADD_AUTHOR, payload: result });
		}
	} catch (e) {
		console.error(e);
	}
};
export const setAuthors = () => async (dispatch) => {
	try {
		const response = await fetch('http://localhost:4000/authors/all');
		const { result } = await response.json();
		if (response.ok) {
			dispatch({
				type: SET_AUTHORS,
				payload: result,
			});
		}
	} catch (e) {
		console.error(e);
	}
};
