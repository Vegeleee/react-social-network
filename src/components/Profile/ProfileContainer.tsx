import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { withRouter } from 'react-router-dom'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/store'


type MapStatePropsType = {
	profile: ProfileType | null
	status: string
	authorizedUserId: number | null
	isAuth: boolean
}

type MapDispatchPropsType = {
	getProfile: any
	getStatus: any
	updateStatus: any
	savePhoto: any
	saveProfile: any
}

type OwnPropsType = {
	match: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		const userId = this.props.match.params.userId || this.props.authorizedUserId

		this.props.getProfile(userId)
		this.props.getStatus(userId)
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}

	render () {
		return (
			<Profile {...this.props} isOwner={!this.props.match.params.userId} />
		)
	}
};

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
	({
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth
	})

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
		{getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)