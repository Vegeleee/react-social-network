import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

	let posts = [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	];

	let postsElements = posts
		.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} />);

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
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;