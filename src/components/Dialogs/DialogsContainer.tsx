import { sendMessage, DialogsInitialStateType } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/store'


type MapStatePropsType = {
	dialogsPage: DialogsInitialStateType
}
type MapDispatchPropsType = {
	sendMessage: (message: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
	({
		dialogsPage: state.dialogsPage
	})

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {sendMessage}),
	withAuthRedirect
)(Dialogs)