import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './User.module.css';
import {NavLink} from 'react-router-dom';

	
const User = ({
	user,
	follow,
	unfollow,
	followingInProgress}) => {

	return (
					<div>
						<div>
							<div>
								<NavLink to={'/profile/' + user.id }>
									<img src={user.photos.small ? user.photos.small : userPhoto} className={classes.userPhoto} />
								</NavLink>
							</div>
							<div>
								{
									user.followed ?
										<button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
											unfollow(user.id);
										}}>Unfollow</button> :
										<button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
											follow(user.id);
										}}>Follow</button>
								}
							</div>
						</div>
						<div>
							<div>{user.name}</div>
							<div>{user.status}</div>
						</div>
						<div>
							<div>{"user.location.country"}</div>
							<div>{"user.location.city"}</div>
						</div>
					</div>
	);
}


export default User;