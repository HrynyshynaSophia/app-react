import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
const SearchBar = ({ onChange, onSubmit }) => {
	return (
		<form className='searchBar' onSubmit={onSubmit}>
			<Input
				inputId='search'
				inputName='search'
				inputPlaceholder='Enter course name...'
				onChange={onChange}
			></Input>
			<Button type='submit' buttonText='Search' className='btnText' />
		</form>
	);
};
export default SearchBar;
