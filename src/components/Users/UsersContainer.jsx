import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from './../../redux/users-selectors'

class UsersContainer extends React.Component {
	componentDidMount() {
		const {requestUsers, currentPage, pageSize} = this.props;
		requestUsers(currentPage, pageSize);
	}

	onPageChanged = (pageNumber) => {
		const {requestUsers, pageSize} = this.props;
		requestUsers(pageNumber, pageSize);
	}

	render() {
		if (this.props.isFetching) {
			return <Preloader />;
		}

		return <>
			{/* { this.props.isFetching ? <Preloader /> : null } */}
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

const mapStateToProps = state =>
	({
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	});

export default compose(
	connect(mapStateToProps, {follow, unfollow, requestUsers}),
	withAuthRedirect
)(UsersContainer);