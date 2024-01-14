import { Link, useParams } from 'react-router-dom';

import getAuthorsById from '../../functions/getAuthorsById';
import formatTime from '../../functions/formatTime';

import { useSelector } from 'react-redux';
import { getCourses, getAuthors } from '../../store/selectors';

const CourseInfo = () => {
	const { courseId } = useParams();
	const courses = useSelector(getCourses);
	const { authorsList: courseAuthors } = useSelector(getAuthors);
	const course = courses.coursesList.find(({ id }) => id === courseId);
	const { id, creationDate, description, duration, title, authors } = course;
	const authorNames = getAuthorsById(courseAuthors, authors)
		.map((author) => author.name)
		.join(', ');

	return (
		<div className='coursesInfo_wrapper'>
			<Link to='/courses'>&#8592; Back to courses</Link>
			<h1>{title}</h1>
			<div className='coursesInfo_body'>
				<div className='coursesInfo_firstColumn'>
					<article className='coursesInfo_description'>{description}</article>
				</div>
				<div className='coursesInfo_secondColumn'>
					<p className='coursesInfo_Id'>
						<b>ID:</b> {id}
					</p>
					<p className='coursesInfo_Duration'>
						<b>Duration: </b> {formatTime(duration)} hours
					</p>
					<p className='coursesInfo_creationDate'>
						<b>Created: </b> {creationDate}
					</p>
					<p className='coursesInfo_authors'>
						<b>Authors: </b>
						{authorNames}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CourseInfo;
