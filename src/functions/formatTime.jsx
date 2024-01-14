export default function formatTime(minutes) {
	const hours = Math.trunc(minutes / 60);
	const mins = minutes % 60;
	const time = `${hours}:${mins}`;
	return time;
}
