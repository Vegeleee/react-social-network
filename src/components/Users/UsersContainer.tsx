import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, requestUsers } from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/store'


type MapStatePropsType = {
	currentPage: number
	pageSize: number
	totalUsersCount: number
	isFetching: boolean
	users: Array<UserType>
	followingInProgress: Array<number>
}

type MapDispatchPropsType = {
	requestUsers: (currentPage: number, pageSize: number) => void
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { requestUsers, currentPage, pageSize } = this.props
		requestUsers(currentPage, pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		const { requestUsers, pageSize } = this.props
		requestUsers(pageNumber, pageSize)
	}

	render() {
		if (this.props.isFetching) {
			return <Preloader />
		}

		return <>
			<Users totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				onPageChanged={this.onPageChanged}
				followingInProgress={this.props.followingInProgress} />
		</>
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
	({
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	})

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, { follow, unfollow, requestUsers }),
	withAuthRedirect
)(UsersContainer)