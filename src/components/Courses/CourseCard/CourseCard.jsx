import Button from '../../common/Button/Button';
import getAuthorsById from '../../../functions/getAuthorsById';
import formatTime from '../../../functions/formatTime';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthors, getUser } from '../../../store/selectors';

import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

import { deleteCourse } from '../../../store/courses/thunk';

const CourseCard = ({ course }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id, title, description, authors, duration, creationDate } = course;
	const { authorsList: courseAuthors } = useSelector(getAuthors);
	const user = useSelector(getUser);
	const isAdmin = user.role === 'admin';
	const authorsNames = getAuthorsById(courseAuthors, authors)
		.map((author) => author.name)
		.join(', ');
	const handleDeleteCourse = () => {
		dispatch(deleteCourse(id));
	};
	return (
		<article className='courseCard'>
			<div className='cardFirstColumn'>
				<h2 className='courseCard__title'>{title}</h2>
				<p className='courseCard__description'>{description}</p>
			</div>
			<div className='cardSecondColumn'>
				<div className='cardInfo'>
					<div className='courseCard__authors'>
						<b>Authors:</b> {authorsNames}{' '}
					</div>
					<div className='courseCard__duration'>
						<b>Duration:</b> {formatTime(duration)} hours
					</div>
					<div className='courseCard__creationDate'>
						<b>Created: </b>
						{creationDate}
					</div>
				</div>
				<div className='cardButtons'>
					<Button
						buttonText='Show course'
						className='btnText'
						onClick={() => {
							navigate(`/courses/${id}`);
						}}
					/>
					{isAdmin && (
						<Button
							buttonText={
								<img src={editIcon} alt='logo' className='buttonIcon' />
							}
							className='btnIcon'
							onClick={() => {
								navigate(`/courses/update/${id}`);
							}}
						/>
					)}
					{isAdmin && (
						<Button
							buttonText={
								<img src={deleteIcon} alt='logo' className='buttonIcon' />
							}
							className='btnIcon'
							onClick={() => {
								handleDeleteCourse();
							}}
						/>
					)}
				</div>
			</div>
		</article>
	);
};
export default CourseCard;
