import {
	COURSES_LOADING,
	COURSES_LOADING_FAILED,
	DELETE_COURSE,
	SET_COURSES,
} from './actionTypes';
import { UPDATE_COURSE, ADD_COURSE } from './actionTypes';
export const setCourses = () => async (dispatch) => {
	try {
		dispatch({
			type: COURSES_LOADING,
		});
		const response = await fetch('http://localhost:4000/courses/all');
		const { result } = await response.json();
		if (response.ok) {
			dispatch({
				type: SET_COURSES,
				payload: result,
			});
		}
	} catch (error) {
		console.error(error);
		dispatch({
			type: COURSES_LOADING_FAILED,
			payload: error,
		});
	}
};
export const deleteCourse = (courseId) => async (dispatch, getState) => {
	const token = getState().user.token;
	try {
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			headers: {
				Authorization: token,
			},
			method: 'DELETE',
		});
		if (response.ok) {
			dispatch({
				type: DELETE_COURSE,
				payload: courseId,
			});
		}
	} catch (error) {
		console.error(error);
	}
};
export const updateCourse = (course) => async (dispatch, getState) => {
	const token = getState().user.token;
	try {
		const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify(course),
		});
		if (response.ok) {
			const { result } = await response.json();
			dispatch({ type: UPDATE_COURSE, payload: result });
		} else {
			throw new Error('Failed to update the course');
		}
	} catch (e) {
		console.error(e);
	}
};
export const addCourse = (course) => async (dispatch, getState) => {
	const token = getState().user.token;
	try {
		const response = await fetch('http://localhost:4000/courses/add', {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(course),
		});
		if (response.ok) {
			const { result } = await response.json();
			dispatch({ type: ADD_COURSE, payload: result });
		}
	} catch (e) {
		console.error(e);
	}
};
