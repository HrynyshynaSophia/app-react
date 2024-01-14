import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button/Button';
import CorseCard from './CourseCard/CourseCard';
import SearchBar from './SearchBar/SearchBar';

import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getUser } from '../../store/selectors';
import { setCourses } from '../../store/courses/thunk';
import { setAuthors } from '../../store/authors/thunk';
import { useMemo } from 'react';

const Courses = () => {
	const [pattern, setPattern] = useState('');
	const [value, setValue] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { coursesList, isLoading, error } = useSelector(getCourses);
	const user = useSelector(getUser);
	const isAdmin = user.role === 'admin';
	useEffect(() => {
		dispatch(setAuthors());
		dispatch(setCourses());
	}, [dispatch]);
	const coursesToRender = useMemo(() => {
		const filteredCourses = coursesList.filter(({ title, id }) => {
			return (
				title.toLowerCase().includes(pattern.toLowerCase()) ||
				id.toLowerCase().includes(pattern.toLowerCase())
			);
		});
		if (isLoading) {
			return <p className='message'>Loading...</p>;
		} else if (error) {
			return <p>{error}</p>;
		} else if (filteredCourses.length > 0) {
			return filteredCourses.map((course) => (
				<div key={course.id}>
					<CorseCard course={course}></CorseCard>
				</div>
			));
		} else {
			return <p className='message'>Sorry, no courses now :(</p>;
		}
	}, [isLoading, error, coursesList, pattern]);

	return (
		<section className='courses'>
			<div className='courses__head'>
				<div className='searchBar'>
					<SearchBar
						onSubmit={(e) => {
							e.preventDefault();
							setPattern(value);
						}}
						onChange={({ target: { value } }) => {
							if (value) {
								setValue(value);
							} else {
								setPattern(value);
							}
						}}
					></SearchBar>
				</div>
				{isAdmin && (
					<Button
						buttonText='Add new course'
						className='btnText'
						onClick={(e) => {
							navigate('/courses/add');
						}}
					/>
				)}
			</div>
			<section className='courses_courses'>{coursesToRender}</section>
		</section>
	);
};
export default Courses;
