export default function getAuthorsById(authorsList, authorsIds) {
	return authorsIds.map((id) => {
		return authorsList.find((author) => author.id === id);
	});
}
