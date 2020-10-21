import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Users from './Users'

import withAuthRedirect from '../../hoc/withAuthRedirect'

import { follow, unfollow, requestUsers, FilterType } from '../../redux/users-reducer'
import {
	getUsers,
	getPageSize,
	getTotalUsersCount,
	getCurrentPage,
	getIsFetching,
	getFollowingInProgress,
	getFilter,
} from '../../redux/users-selectors'

import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/store'

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { requestUsers, currentPage, pageSize, filter } = this.props
		requestUsers(currentPage, pageSize, filter)
	}

	onPageChanged = (pageNumber: number) => {
		const { requestUsers, pageSize, filter } = this.props
		requestUsers(pageNumber, pageSize, filter)
	}

	onFilterChanged = (filter: FilterType) => {
		const { requestUsers, pageSize } = this.props

		requestUsers(1, pageSize, filter)
	}

	render() {
		return (
			<>
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					users={this.props.users}
					isFetching={this.props.isFetching}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					onPageChanged={this.onPageChanged}
					onFilterChanged={this.onFilterChanged}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		)
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	users: getUsers(state),
	pageSize: getPageSize(state),
	totalUsersCount: getTotalUsersCount(state),
	currentPage: getCurrentPage(state),
	isFetching: getIsFetching(state),
	followingInProgress: getFollowingInProgress(state),
	filter: getFilter(state),
})

export default compose<React.ComponentType>(
	connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
		follow,
		unfollow,
		requestUsers,
	}),
	withAuthRedirect
)(UsersContainer)

type MapStatePropsType = {
	currentPage: number
	pageSize: number
	totalUsersCount: number
	isFetching: boolean
	users: Array<UserType>
	followingInProgress: Array<number>
	filter: FilterType
}
type MapDispatchPropsType = {
	requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType
