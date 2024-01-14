import mockedAuthorsList from '../components/Courses/Info/mockedAuthorsList';
export default function getAuthorByName(authorsNames) {
	return (authorsNames = mockedAuthorsList.find(
		(author) => author.name === authorsNames
	));
}
