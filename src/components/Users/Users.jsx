import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';
import {NavLink} from 'react-router-dom';
import { followAPI } from '../../api/api';

	
const Users = ({
	totalUsersCount,
	pageSize,
	currentPage,
	users,
	follow,
	unfollow,
	onPageChanged}) => {

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
										<button onClick={() => {
											followAPI.unfollow(u.id)
												.then(data => {
													if (data.resultCode === 0) {
														unfollow(u.id);
													}
												})
										}}>Unfollow</button> :
										<button onClick={() => {
											followAPI.follow(u.id)
												.then(data => {
													if (data.resultCode === 0) {
														follow(u.id);
													}
												})
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