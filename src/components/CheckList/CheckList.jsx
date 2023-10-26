import React from 'react';
import ItemForm from './Form/ItemForm';
import MyHeader from '../UI/MyHeader/MyHeader';
import MyButton from '../UI/MyButton/MyButton';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import CheckListItem from './CheckListItem/CheckListItem';
import styles from './CheckList.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const selectCategorys = (state) => state.category;
const selectItemsByCategory = createSelector(
	[selectCategorys, (state, name) => name],
	(categorys, name) => categorys.filter((category) => category.name === name)
);

const CheckList = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [items] = useSelector((state) => selectItemsByCategory(state, name));

	return (
		<div className={cm('wrapper')}>
			<MyHeader
				value={name}
				leftChild={
					<MyButton
						value={'이전'}
						type={'default'}
						onClick={() => navigate(-1)}
					/>
				}
			/>
			<ul className={cm('list')}>
				{items &&
					items.itemList.map((item) => (
						<CheckListItem key={item.id} item={item} />
					))}
			</ul>
			<ItemForm />
		</div>
	);
};

export default CheckList;