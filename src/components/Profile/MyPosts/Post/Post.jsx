import React from 'react';
import classes from './Post.module.scss';
import userPhoto from './../../../../assets/images/user.png'

const Post = (props) => {
	return (
		<div className={classes.item}>
			<div className={classes.wrapper}>
				<img src={userPhoto} />
				{props.message}
			</div>
			<div className={classes.likes}>
				<span>like</span> <span>{props.likesCount}</span>
			</div>
		</div>
	);
};

export default Post;