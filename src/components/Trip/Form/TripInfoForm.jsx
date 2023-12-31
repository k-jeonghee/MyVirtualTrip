import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';
import styles from './TripInfoForm.module.css';
import classnames from 'classnames/bind';
import MyHeader from '../../UI/MyHeader/MyHeader';
import MyButton from '../../UI/MyButton/MyButton';

const cm = classnames.bind(styles);

const TripInfoForm = ({ isEdit }) => {
	// console.log('TripInfoForm');
	const [info, setInfo] = useState({
		title: '',
		date: '',
		member: '',
	});
	const { state } = useLocation();
	useEffect(() => {
		isEdit && setInfo(state);
	}, []);

	const navigate = useNavigate();
	const handleChange = (e) => {
		setInfo((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = () => {
		localStorage.setItem('tripInfo', JSON.stringify(info));
		navigate('/');
	};
	return (
		<>
			<MyHeader value={'일정 등록'} />
			<form className={cm('info_form')}>
				<label htmlFor="title">제목</label>
				<input
					type="text"
					id="title"
					value={info.title}
					onChange={handleChange}
				/>
				<label htmlFor="date">날짜</label>
				<input
					type="date"
					id="date"
					value={info.date}
					onChange={handleChange}
				/>
				<label htmlFor="member">참여</label>
				<input
					type="text"
					id="member"
					value={info.member}
					onChange={handleChange}
				/>
				<div className={cm('btn_container')}>
					<MyButton
						value={'취소'}
						type={'default'}
						onClick={() => navigate(-1)}
					/>
					<MyButton value={'등록'} type={'confirm'} onClick={handleSubmit} />
				</div>
			</form>
		</>
	);
};

export default TripInfoForm;
