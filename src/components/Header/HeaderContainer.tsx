import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/store'

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
})

export default (connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, { logout })(
	HeaderContainer
) as unknown) as React.ComponentType

type MapStatePropsType = {
	isAuth: boolean
	login: string | null
}
type MapDispatchPropsType = {
	logout: () => void
}
