import React from 'react';
import Axios from 'axios';
import userPhoto from '../../assets/images/user.png';
import classes from './Users.module.css';

const Users = ({users, follow, unfollow, setUsers}) => {

	if (users.length == 0) {
		Axios
		.get("https://social-network.samuraijs.com/api/1.0/users")
		.then(response => {
			setUsers(response.data.items);
		});
	}

	return (
		<div>
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
};

export default Users;