import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {

	let postsElements = props.posts
		.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} />);

	let newPostElement = React.createRef();

	let onAddPost = () => {
		props.addPost();
	};

	let onNewPostTextChange = () => {
		let newText = newPostElement.current.value;
		props.updateNewPostText(newText);
	};

	return (
		<div className={classes.postsBlock}>
			<h3>My posts</h3>
			<div>
				<div>
					<textarea onChange={onNewPostTextChange} ref={newPostElement} value={props.newPostText} />
				</div>
				<div>
					<button onClick={onAddPost}>Add post</button>
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