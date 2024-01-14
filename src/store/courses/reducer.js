import {
	SET_COURSES,
	DELETE_COURSE,
	ADD_COURSE,
	COURSES_LOADING,
	COURSES_LOADING_FAILED,
	UPDATE_COURSE,
} from './actionTypes';

const initialState = {
	coursesList: [],
};
const coursesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COURSES:
			return {
				...state,
				coursesList: action.payload,
				isLoading: false,
			};
		case DELETE_COURSE:
			const index = state.coursesList.findIndex(
				(course) => course.id === action.payload
			);
			const newCourses = [...state.coursesList];
			newCourses.splice(index, 1);
			return {
				...state,
				coursesList: newCourses,
			};
		case ADD_COURSE:
			return {
				...state,
				coursesList: [...state.coursesList, action.payload],
			};
		case UPDATE_COURSE:
			return {
				...state,
				coursesList: state.coursesList.map((course) =>
					course.id === action.payload.id ? action.payload : course
				),
			};
		case COURSES_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case COURSES_LOADING_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default coursesReducer;
