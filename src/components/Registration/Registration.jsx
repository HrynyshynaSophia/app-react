import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import isValidEmail from '../../functions/isValidEmail';
const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			name,
			email,
			password,
		};
		if (isValidEmail(email) && password.length >= 6 && name) {
			try {
				const response = await fetch('http://localhost:4000/register', {
					method: 'POST',
					body: JSON.stringify(newUser),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (response.ok) {
					navigate('/login');
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			if (!isValidEmail(email)) {
				alert('Your email is invalid');
			} else if (password.length < 6) {
				alert('Password length should be 6 characters minimum ');
			} else if (!email || !name || !password) {
				alert('All fields must be filled!');
			} else {
				alert('Sorry, something went wrong :(');
			}
		}
	};
	return (
		<div className='registration__container'>
			<h2>Registration</h2>
			<form className='registration' onSubmit={handleSubmit}>
				<Input
					labelText='Name'
					inputPlaceholder='Enter name'
					onChange={({ target: { value } }) => {
						setName(value);
					}}
				></Input>
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
					onChange={({ target: { value } }) => {
						setPassword(value);
					}}
				></Input>
				<Button buttonText='Registration' type='submit'></Button>
			</form>
			<p className='registration__link'>
				If you have an account you can <Link to='/'>Login</Link>
			</p>
		</div>
	);
};
export default Registration;
