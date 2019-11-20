import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';

	
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
								<img src={u.photos.small ? u.photos.small : userPhoto} className={classes.userPhoto} />
							</div>
							<div>
								{
									u.followed ?
										<button onClick={() => unfollow(u.id)}>Unfollow</button> :
										<button onClick={() => follow(u.id)}>Follow</button>
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