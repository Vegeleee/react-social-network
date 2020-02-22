import { addPost } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
import { PostType } from '../../../types/types'
import { AppStateType } from '../../../redux/store'


type MapStatePropsType = {
	posts: Array<PostType>
}

type MapDispatchPropsType = {
	addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
	({
		posts: state.profilePage.posts
	})


export default connect(mapStateToProps, {addPost})(MyPosts)