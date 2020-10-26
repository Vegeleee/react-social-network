import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import querystring from 'querystring'

import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import Preloader from '../common/Preloader/Preloader'

import classes from './Users.module.scss'

import {
	getCurrentPage,
	getTotalUsersCount,
	getPageSize,
	getIsFetching,
	getFilter,
	getUsers,
	getFollowingInProgress,
} from '../../redux/users-selectors'

import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer'

type QueryParamsType = {
	term?: string
	page?: string
	friend?: string
}

export const Users: React.FC = () => {
	const users = useSelector(getUsers)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const filter = useSelector(getFilter)
	const isFetching = useSelector(getIsFetching)
	const followingInProgress = useSelector(getFollowingInProgress)

	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		const parsed = querystring.parse(history.location.search.substr(1)) as QueryParamsType

		const actualPage = parsed.page ? +parsed.page : currentPage
		let actualFilter = filter
		if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
		if (parsed.friend)
			actualFilter = {
				...actualFilter,
				friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false,
			}

		dispatch(requestUsers(actualPage, pageSize, actualFilter))
	}, [])

	useEffect(() => {
		const query: QueryParamsType = {}

		if (filter.term) query.term = filter.term
		if (filter.friend !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)

		history.push({
			pathname: '/users',
			search: querystring.stringify(query),
		})
	}, [filter, currentPage])

	const onPageChanged = (pageNumber: number) => {
		dispatch(requestUsers(pageNumber, pageSize, filter))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(requestUsers(1, pageSize, filter))
	}

	// const follow = (userId: number) => {
	// 	dispatch(follow(userId))
	// }

	// const unfollow = (userId: number) => {
	// 	dispatch(unfollow(userId))
	// }

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
							follow={(userId: number) => {
								dispatch(follow(userId))
							}}
							unfollow={(userId: number) => {
								dispatch(unfollow(userId))
							}}
							followingInProgress={followingInProgress}
						/>
					))}
				</div>
			)}
		</div>
	)
}
