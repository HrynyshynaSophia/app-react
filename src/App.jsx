import React, { useEffect } from 'react';
import {
	Route,
	Navigate,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { NotFound } from './components/NotFound/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from './constants';
import { PrivateRoute } from './components/PrivateRouter/PrivateRouter';
import { fetchCurrentUser } from './store/user/thunk';
import { loader } from './functions/loader';
import { getUser } from './store/selectors';
const App = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');
	const { isAuth } = useSelector(getUser);
	useEffect(() => {
		if (token) {
			dispatch(fetchCurrentUser(token));
		}
	}, [dispatch, token]);
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path='/'
					element={isAuth ? <Navigate replace to={'/courses'} /> : <Login />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route
					element={
						<PrivateRoute
							redirectPath='/login'
							allowedRoles={[ROLES.ADMIN, ROLES.USER]}
						/>
					}
					loader={loader}
					errorElement={<ErrorBoundary />}
				>
					<Route path='courses' element={<Courses />} />
					<Route path='courses/:courseId' element={<CourseInfo />} />
				</Route>
				<Route
					element={
						<PrivateRoute
							redirectPath='/courses'
							allowedRoles={[ROLES.ADMIN]}
						/>
					}
					loader={loader}
				>
					<Route path='/courses/add' element={<CourseForm />} />
					<Route path='/courses/update/:courseId' element={<CourseForm />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</>
		)
	);
	return (
		<div className='container'>
			<Header />
			<RouterProvider router={router} />
		</div>
	);
};
export default App;
