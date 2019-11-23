import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';

	
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
											Axios
												.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
													withCredentials: true,
													headers: {
														"API-KEY": "9eaf8a81-439e-4ee6-bdba-3b5b47726656"
													}
												})
												.then(response => {
													if (response.data.resultCode === 0) {
														unfollow(u.id);
													}
												})
										}}>Unfollow</button> :
										<button onClick={() => {
											Axios
												.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
													withCredentials: true,
													headers: {
														"API-KEY": "9eaf8a81-439e-4ee6-bdba-3b5b47726656"
													}
												})
												.then(response => {
													if (response.data.resultCode === 0) {
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