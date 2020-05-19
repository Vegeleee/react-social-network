import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/store'

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
})

type MapStatePropsType = {
	isAuth: boolean
}

type MapDispatchToProps = {}

function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapStatePropsType & MapDispatchToProps> = (
		props
	) => {
		const { isAuth, ...restProps } = props
		if (!isAuth) return <Redirect to={'/login'} />

		return <Component {...(restProps as WCP)} />
	}

	const ConnectedRedirectComponent = connect<
		MapStatePropsType,
		MapDispatchToProps,
		WCP,
		AppStateType
	>(mapStateToProps)(RedirectComponent)

	return ConnectedRedirectComponent
}

export default withAuthRedirect
