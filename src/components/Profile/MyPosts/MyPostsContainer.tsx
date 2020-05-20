import { actions } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { PostType } from '../../../types/types'
import { AppStateType } from '../../../redux/store'

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	posts: state.profilePage.posts,
})

export default (connect<
	MapStatePropsType,
	MapDispatchPropsType,
	null,
	AppStateType
>(mapStateToProps, { ...actions })(MyPosts) as unknown) as React.ComponentType

type MapStatePropsType = {
	posts: Array<PostType>
}
type MapDispatchPropsType = {
	addPost: (newPostText: string) => void
}
