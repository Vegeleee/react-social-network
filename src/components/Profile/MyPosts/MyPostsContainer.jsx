import { addPost, updateNewPostText } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


const mapStateToProps = state =>
	({
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	});


export default connect(mapStateToProps, {addPost, updateNewPostText})(MyPosts);