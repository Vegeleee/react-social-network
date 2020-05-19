import { DialogsInitialStateType, actions } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/store'

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	dialogsPage: state.dialogsPage,
})

export default compose<React.ComponentType>(
	connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
		mapStateToProps,
		{ ...actions }
	),
	withAuthRedirect
)(Dialogs)

type MapStatePropsType = {
	dialogsPage: DialogsInitialStateType
}
type MapDispatchPropsType = {
	sendMessage: (message: string) => void
}
