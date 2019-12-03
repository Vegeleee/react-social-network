import { addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


const mapStateToProps = state =>
	({
		posts: state.profilePage.posts
	});


export default connect(mapStateToProps, {addPost})(MyPosts);