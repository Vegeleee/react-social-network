import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
	return (
		<div className={classes.item}>
			<img src="https://hornews.com/images/news_large/c1d4b2b8ec608ea72764c5678816d5c9.jpg" />
			{props.message}
			<div>
				<span>like</span>
			</div>
		</div>
	);
};

export default Post;