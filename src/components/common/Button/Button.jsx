const Button = ({ onClick, type, buttonText, className = 'btn' }) => {
	const btnClass = `btn ${className}`;
	return (
		<button className={btnClass} onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
};
export default Button;
