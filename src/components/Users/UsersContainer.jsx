import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching } from '../../redux/users-reducer';
import Axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);

		Axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount);
			});
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);

		Axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(response.data.items);
			});
	}

	render() {
		return <>
			{ this.props.isFetching ? <Preloader /> : null }
			<Users totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				onPageChanged={this.onPageChanged} />;
			</>
	}
}

const mapStateToProps = state =>
	({
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching
	});

// const mapDispatchToProps = dispatch =>
// 	({
// 		follow(userId) {
// 			dispatch(followAC(userId));
// 		},
// 		unfollow(userId) {
// 			dispatch(unfollowAC(userId));
// 		},
// 		setUsers(users) {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage(currentPage) {
// 			dispatch(setCurrentPageAC(currentPage));
// 		},
// 		setTotalUsersCount(totalUsersCount) {
// 			dispatch(setUsersTotalCountAC(totalUsersCount));
// 		},
// 		toggleIsFetching(isFetching) {
// 			dispatch(toggleIsFetchingAC(isFetching));
// 		}
// 	});

export default connect(mapStateToProps,
	{follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);