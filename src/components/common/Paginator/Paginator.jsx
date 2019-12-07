import React from 'react';
import classes from './Paginator.module.css';


const Paginator = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged}) => {

	const pagesCount = Math.ceil(totalUsersCount / pageSize);

	const pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	return (
		<div>
			{
				pages.map(p =>
					<span
						className={currentPage === p ? classes.selectedPage : null}
						onClick={() => { onPageChanged(p) }}>{p}</span>)
			}
		</div>
	);
}


export default Paginator;