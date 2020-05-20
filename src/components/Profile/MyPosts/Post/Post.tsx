import React from 'react'
import classes from './Post.module.scss'
import userPhoto from './../../../../assets/images/user.png'

const Post: React.FC<PropsType> = ({ message, likesCount }) => {
	return (
		<div className={classes.item}>
			<div className={classes.wrapper}>
				<img src={userPhoto} alt="User" />
				{message}
			</div>
			<div className={classes.likes}>
				<span>like</span> <span>{likesCount}</span>
			</div>
		</div>
	)
}

export default Post

type PropsType = {
	id: number
	message: string
	likesCount: number
}
