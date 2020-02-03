import React from 'react';
import classes from './MyPosts.module.scss';
import Post from './Post/Post';
import NewPostReduxForm from './AddPostForm/AddPostForm';


const MyPosts = React.memo(({ posts, addPost }) => {

	const postsElements = posts
		.map(p => <Post id={p.id} key={p.id} message={p.message} likesCount={p.likesCount} />);

	const addNewPost = formData => {
		addPost(formData.newPostText);
	};

	return (
		<div className={classes.postsBlock}>
			<h3>My posts</h3>
			<div>
				<NewPostReduxForm onSubmit={addNewPost} />
			</div>
			<div className={classes.posts}>
				{postsElements}
			</div>
		</div>
	);
});

export default MyPosts;