import React from 'react';
import classes from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

	
const Users = ({
	totalUsersCount,
	pageSize,
	currentPage,
	users,
	follow,
	unfollow,
	onPageChanged,
	followingInProgress}) => {

	return (
		<div>
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged} />
			{
				users.map(u => <User key={u.id}
					user={u}
					follow={follow}
					unfollow={unfollow}
					followingInProgress={followingInProgress} />)
			}
		</div>
	);
}


export default Users;