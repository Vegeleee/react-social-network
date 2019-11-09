import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';


const MyPostsContainer = (props) => {
	const state = props.store.getState();

	const addPost = () => {
		props.store.dispatch(addPostActionCreator());
	};

	const updateNewPostText = (newText) => {
		props.store.dispatch(updateNewPostTextActionCreator(newText));
	}

	return (
		<MyPosts updateNewPostText={updateNewPostText}
						 addPost={addPost}
						 posts={state.profilePage.posts}
						 newPostText={state.profilePage.newPostText} />
	);
};

export default MyPostsContainer;