import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import { getUser } from '../../store/selectors';
import { useEffect } from 'react';
import { loginUser } from '../../store/user/thunk';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isAuth } = useSelector(getUser);
	useEffect(() => {
		if (isAuth) {
			navigate('/courses');
		}
	}, [isAuth, navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};
	return (
		<div className='login__container'>
			<h2>Login</h2>
			<form className='login' onSubmit={handleSubmit}>
				<Input
					labelText='Email'
					inputPlaceholder='Enter email'
					onChange={({ target: { value } }) => {
						setEmail(value);
					}}
				></Input>
				<Input
					labelText='Password'
					inputPlaceholder='Enter password'
					inputType='password'
					onChange={({ target: { value } }) => setPassword(value)}
				></Input>
				<Button buttonText='Login' type='submit'></Button>
			</form>
			<p className='login_link'>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</div>
	);
};
export default Login;
