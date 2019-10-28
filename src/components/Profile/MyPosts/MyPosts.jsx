import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

	let postsData = [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	];

	return (
		<div className={classes.postsBlock}>
			<h3>My posts</h3>
			<div>
				<div>
					<textarea></textarea>
				</div>
				<div>
					<button>Add post</button>
				</div>
				<div>
					<button>Remove</button>
				</div>
			</div>
			<div className={classes.posts}>
				<Post id={postsData[0].id} message={postsData[0].message} likesCount={postsData[0].likesCount} />
				<Post id={postsData[1].id} message={postsData[1].message} likesCount={postsData[1].likesCount} />
			</div>
		</div>
	);
};

export default MyPosts;