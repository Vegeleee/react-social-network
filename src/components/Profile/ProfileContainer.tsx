import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/store'

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		const userId: number | null = +this.props.match.params.userId || this.props.authorizedUserId

		this.props.getProfile(userId as number)
		this.props.getStatus(userId as number)
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
	}
}

const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
	connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps<PathParamsType>, AppStateType>(mapStateToProps, {
		getProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
	getProfile: (userId: number) => void
	getStatus: (userId: number) => void
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => any
}
type PathParamsType = {
	userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
