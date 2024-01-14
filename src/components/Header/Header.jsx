import Logo from './components/Logo/Logo';
import Button from '../common/Button/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { logoutUser } from '../../store/user/thunk';
const Header = () => {
	const dispatch = useDispatch();
	const { isAuth, name } = useSelector(getUser);
	const handleLogOut = () => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(logoutUser(token));
		}
	};

	return (
		<header className='header'>
			<Logo />
			<div>
				<p>{isAuth ? name : ' '}</p>
				{isAuth && (
					<Button
						type='button'
						buttonText='Logout'
						onClick={handleLogOut}
						className='btnText'
					/>
				)}
			</div>
		</header>
	);
};
export default Header;
