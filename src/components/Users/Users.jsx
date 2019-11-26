import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';
import {NavLink} from 'react-router-dom';

	
const Users = ({
	totalUsersCount,
	pageSize,
	currentPage,
	users,
	follow,
	unfollow,
	onPageChanged,
	followingInProgress}) => {

	const pagesCount = Math.ceil(totalUsersCount / pageSize);

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
							className={currentPage === p && classes.selectedPage}
							onClick={() => { onPageChanged(p) }}>{p}</span>)
				}
			</div>
			{
				users.map(u =>
					<div key={u.id}>
						<div>
							<div>
								<NavLink to={'/profile/' + u.id }>
									<img src={u.photos.small ? u.photos.small : userPhoto} className={classes.userPhoto} />
								</NavLink>
							</div>
							<div>
								{
									u.followed ?
										<button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
											unfollow(u.id);
										}}>Unfollow</button> :
										<button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
											follow(u.id);
										}}>Follow</button>
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


export default Users;