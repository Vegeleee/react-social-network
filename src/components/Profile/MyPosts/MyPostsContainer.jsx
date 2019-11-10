import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';


const MyPostsContainer = (props) => {
	// const state = props.store.getState();

	// const addPost = () => {
	// 	props.store.dispatch(addPostActionCreator());
	// };

	// const updateNewPostText = (newText) => {
	// 	props.store.dispatch(updateNewPostTextActionCreator(newText));
	// }

	return (
		<StoreContext.Consumer>
			{store => {
				const state = store.getState();

				const addPost = () => {
					store.dispatch(addPostActionCreator());
				};
			
				const updateNewPostText = (newText) => {
					store.dispatch(updateNewPostTextActionCreator(newText));
				}

				return (
					<MyPosts updateNewPostText={updateNewPostText}
									 addPost={addPost}
									 posts={state.profilePage.posts}
									 newPostText={state.profilePage.newPostText} />
					)
				}
			}
		</StoreContext.Consumer>
	);
};

export default MyPostsContainer;