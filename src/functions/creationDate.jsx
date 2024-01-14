export default function dateGenerator() {
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();
	return `${day}/${month + 1}/${year}`;
}
