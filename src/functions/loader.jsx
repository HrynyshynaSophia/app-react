import { fetchUser } from '../store/services';

export const loader = async () => {
	const token = localStorage.getItem('token');
	if (token) {
		const userData = await fetchUser(token);
		if (!userData.successful) {
			throw new Error('Can not fetch data');
		}

		return userData;
	}
	return null;
};
