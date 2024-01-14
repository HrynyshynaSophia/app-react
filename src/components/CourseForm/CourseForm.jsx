import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import getAuthorsById from '../../functions/getAuthorsById';
import formatTime from '../../functions/formatTime';
import dateGenerator from '../../functions/creationDate';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthors, getCourses } from '../../store/selectors';
import { addAuthor } from '../../store/authors/thunk';
import { addCourse, updateCourse } from '../../store/courses/thunk';

const CourseForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		authorsList: allAuthors,
		isAuthorsLoading,
		authorsError,
	} = useSelector(getAuthors);
	const { courseId } = useParams();
	const [btnText, setBtnText] = useState('Create course');
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseDuration, setCourseDuration] = useState(0);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDate, setCourseDate] = useState('');
	const courses = useSelector(getCourses);
	const [availableAuthorsList, setAvailableAuthorsList] = useState([]);

	useEffect(() => {
		if (courseId) {
			const currentCourse = courses.coursesList.find(
				({ id }) => id === courseId
			);
			const { title, description, creationDate, duration, authors } =
				currentCourse;
			setCourseTitle(title);
			setCourseDescription(description);
			setCourseDuration(duration);
			const authorsObjects = getAuthorsById(allAuthors, authors);
			const filteredAuthors = availableAuthorsList.filter(
				(author) => !authorsObjects.includes(author)
			);
			setAvailableAuthorsList(filteredAuthors);
			setCourseAuthors(authorsObjects);
			setCourseDate(creationDate);
			setBtnText('Update course');
		} else {
			setAvailableAuthorsList(allAuthors);
		}
	}, [allAuthors]);
	const [newAuthor, setNewAuthor] = useState({});

	const handleAddTitle = ({ target: { value } }) => {
		setCourseTitle(value);
	};

	const handleAddDescription = ({ target: { value } }) => {
		setCourseDescription(value);
	};

	const handleAddDuration = ({ target: { value } }) => {
		let duration = value;
		if (duration < 0 || isNaN(duration)) {
			duration = 0;
		}
		duration = Math.floor(duration);
		setCourseDuration(duration);
	};

	const handleCreateAuthor = (e) => {
		e.preventDefault();
		if (newAuthor.name.length < 2) {
			alert('Too short author name');
			return;
		}
		dispatch(addAuthor(newAuthor));
	};
	useEffect(() => {
		const newAvailableAuthorsList = allAuthors.filter(
			(author) => !courseAuthors.includes(author)
		);
		setAvailableAuthorsList(newAvailableAuthorsList);
		setNewAuthor('');
	}, [courseAuthors]);
	const handleAddAuthor = (author) => {
		const newAuthors = availableAuthorsList.filter(
			(newAuthor) => newAuthor.id !== author.id
		);
		setAvailableAuthorsList(newAuthors);
		setCourseAuthors([...courseAuthors, author]);
	};

	const handleDeleteAuthor = (addedAuthor) => {
		const newAuthorsList = courseAuthors.filter(
			(author) => author.id !== addedAuthor.id
		);
		setCourseAuthors(newAuthorsList);
		setAvailableAuthorsList([...availableAuthorsList, addedAuthor]);
	};

	const handleSetCourse = (e) => {
		e.preventDefault();
		if (
			!courseTitle ||
			!courseDescription ||
			!courseAuthors.length ||
			courseDuration === 0
		) {
			alert('All fields are required.');
			return;
		}
		const course = {
			id: courseId || '',
			title: courseTitle,
			description: courseDescription,
			creationDate: courseId ? courseDate : dateGenerator(),
			duration: courseDuration,
			authors: courseAuthors.map((author) => author.id),
		};
		btnText === 'Create course'
			? dispatch(addCourse(course))
			: dispatch(updateCourse(course));
		navigate('/courses');
	};

	const generalAuthors = availableAuthorsList
		.filter((author) => !courseAuthors.includes(author))
		.map((author) => {
			return (
				<li key={author.id} className='courseForm__author'>
					<p>{author.name}</p>
					<Button
						buttonText='Add author'
						className='btnText'
						onClick={(e) => handleAddAuthor(author)}
					/>
				</li>
			);
		});
	return (
		<>
			<form className='courseForm'>
				<div className='courseForm__firstPart'>
					<div className='courseForm__header'>
						<Input
							labelText='Title'
							inputId='title'
							inputValue={courseTitle}
							onChange={(e) => handleAddTitle(e)}
						></Input>
						<Button
							buttonText={btnText}
							className='btnText'
							onClick={(e) => handleSetCourse(e)}
						></Button>
					</div>
					<div className='courseForm__desription'>
						<label>
							Description
							<textarea
								name='description'
								placeholder='Enter description'
								minLength='2'
								value={courseDescription}
								onChange={(e) => handleAddDescription(e)}
							></textarea>
						</label>
					</div>
				</div>
				<div className='courseForm__secondPart'>
					<article>
						<div className='courseForm__firstRow row'>
							<section className='courseForm__addAuthor'>
								<h3>Add author</h3>
								<Input
									labelText='Author name'
									inputId='authorName'
									inputPlaceholder='Enter author name...'
									onChange={({ target: { value } }) => {
										setNewAuthor({
											name: value,
										});
									}}
								/>
								<Button
									buttonText='Create author'
									className='btnText'
									onClick={(e) => {
										handleCreateAuthor(e);
									}}
								/>
							</section>
							<section className='courseForm__authors authors'>
								<h3>Authors</h3>
								{isAuthorsLoading ? (
									<p className='message'>Loading...</p>
								) : authorsError ? (
									<p>{authorsError}</p>
								) : (
									generalAuthors
								)}
							</section>
						</div>
						<div className='courseForm__secondRow row'>
							<section className='courseForm__duration '>
								<h3>Duration</h3>
								<Input
									labelText='Duration'
									inputId='duration'
									inputPlaceholder='Enter duration in minutes...'
									inputValue={courseDuration}
									onChange={(e) => handleAddDuration(e)}
								/>
								<p>
									Duration: <span>{formatTime(courseDuration)} </span>hours
								</p>
							</section>
							<section className='courseForm__courseAuthors authors'>
								<h3>Course authors</h3>
								{courseAuthors.length === 0 ? (
									<p className='courseForm__emptyAuthorsList'>
										Author list is empty.
									</p>
								) : (
									courseAuthors.map((courseAuthor) => {
										return (
											<li key={courseAuthor.id} className='courseForm__author'>
												<p>{courseAuthor.name}</p>
												<Button
													buttonText='Delete author'
													className='btnText'
													onClick={(e) => handleDeleteAuthor(courseAuthor)}
												/>
											</li>
										);
									})
								)}
							</section>
						</div>
					</article>
				</div>
			</form>
		</>
	);
};

export default CourseForm;
