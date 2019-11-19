import React from 'react';
import Axios from 'axios';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';

class Users extends React.Component {
	componentDidMount() {
		Axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount);
			});
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)

		Axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setUsers(response.data.items);
			});
	}

	render() {

		const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

		const pages = [];
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i);
		}

		return (
			<div>
				<div>
					{
						pages.map(p =>
							<span
								className={this.props.currentPage === p && classes.selectedPage}
								onClick={() => { this.onPageChanged(p) }}>{p}</span>)
					}
				</div>
				{
					this.props.users.map(u =>
						<div key={u.id}>
							<div>
								<div>
									<img src={u.photos.small ? u.photos.small : userPhoto} className={classes.userPhoto} />
								</div>
								<div>
									{
										u.followed ?
											<button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
											<button onClick={() => this.props.follow(u.id)}>Follow</button>
									}
								</div>
							</div>
							<div>
								<div>{u.name}</div>
								<div>{u.status}</div>
							</div>
							<div>
								<div>{"u.location.country"}</div>
								<div>{"u.location.city"}</div>
							</div>
						</div>
	
					)
				}
			</div>
		);
	}
}

export default Users;