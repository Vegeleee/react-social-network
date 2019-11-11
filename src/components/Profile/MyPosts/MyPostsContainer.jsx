import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


const mapStateToProps = state =>
	({
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	});

const mapDispatchToProps = dispatch =>
	({
		addPost() {
			dispatch(addPostActionCreator());
		},

		updateNewPostText(newText) {
			dispatch(updateNewPostTextActionCreator(newText));
		}
	});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;