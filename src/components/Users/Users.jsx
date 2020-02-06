import React from 'react';
import classes from './Users.module.scss';
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
	followingInProgress }) => {

	return (
		<div className={classes.usersContainer}>
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged} />
			<div className={classes.usersWrapper}>
				{
					users.map(u => <User key={u.id}
						user={u}
						follow={follow}
						unfollow={unfollow}
						followingInProgress={followingInProgress} />)
				}
			</div>
		</div>
	);
}


export default Users;