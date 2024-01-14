const Input = ({
	inputId,
	labelText,
	inputName,
	inputPlaceholder,
	onChange,
	onSubmit,
	inputValue,
	inputType = 'text',
}) => {
	return (
		<div>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				name={inputName}
				type={inputType}
				value={inputValue}
				placeholder={inputPlaceholder}
				onChange={onChange}
				onSubmit={onSubmit}
			></input>
		</div>
	);
};
export default Input;
