import React from 'react';
import userPhoto from '../../assets/images/user.png';
import classes from './User.module.scss';
import {NavLink} from 'react-router-dom';

	
const User = ({
	user,
	follow,
	unfollow,
	followingInProgress}) => {

	return (
					<div className={classes.user}>
						<div>
							<div className={classes.userPhoto}>
								<NavLink to={'/profile/' + user.id }>
									<img src={user.photos.small ? user.photos.small : userPhoto} />
								</NavLink>
							</div>
							<div className={classes.userFollowButton}>
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
						<div className={classes.userInfo}>
							<div className={classes.userInfoName}>{user.name}</div>
							<div>{user.status}</div>
						</div>
						<div className={classes.userLocation}>
							<div>{"user.location.country"}</div>
							<div>{"user.location.city"}</div>
						</div>
					</div>
	);
}


export default User;