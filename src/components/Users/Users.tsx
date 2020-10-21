import React from 'react'

import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import Preloader from '../common/Preloader/Preloader'

import { UserType } from '../../types/types'

import classes from './Users.module.scss'
import { FilterType } from '../../redux/users-reducer'

const Users: React.FC<PropsType> = ({
	totalUsersCount,
	pageSize,
	currentPage,
	users,
	isFetching,
	follow,
	unfollow,
	onPageChanged,
	onFilterChanged,
	followingInProgress,
}) => {
	return (
		<div className={classes.usersContainer}>
			<UsersSearchForm onFilterChanged={onFilterChanged} />

			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged}
			/>
			{isFetching ? (
				<Preloader />
			) : (
				<div className={classes.usersWrapper}>
					{users.map((u) => (
						<User
							key={u.id}
							user={u}
							follow={follow}
							unfollow={unfollow}
							followingInProgress={followingInProgress}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Users

type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	users: Array<UserType>
	isFetching: boolean
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	onPageChanged: (pageNumber: number) => void
	onFilterChanged: (filter: FilterType) => void
	followingInProgress: Array<number>
}
