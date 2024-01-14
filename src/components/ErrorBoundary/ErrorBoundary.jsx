import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
export const ErrorBoundary = () => {
	const navigate = useNavigate();
	const error = useRouteError();
	const { isAuth } = useSelector(getUser);

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	return (
		<section className={'error-wrapper'}>
			<h1>Oops... Something went wrong</h1>
			<p>{error.message}</p>
			<p>Check connection to the server</p>
		</section>
	);
};
