import React from 'react'
import classes from './Users.module.scss'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'


type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	users: Array<UserType>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	onPageChanged: (pageNumber: number) => void
	followingInProgress: Array<number>
}

const Users: React.FC<PropsType> = ({
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
	)
}


export default Users