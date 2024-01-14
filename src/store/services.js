export const fetchUser = async (token) => {
	try {
		const response = await fetch('http://localhost:4000/users/me', {
			headers: {
				Authorization: token,
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return { successful: false, error };
	}
};
