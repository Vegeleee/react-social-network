import React from 'react'
import { Profile } from './Profile'
import { connect } from 'react-redux'
import { saveProfile } from '../../redux/profile-reducer'
import { compose } from 'redux'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/store'

class ProfileContainer extends React.Component<PropsType> {
	render() {
		return <Profile {...this.props} />
	}
}

export default compose<React.ComponentType>(
	connect<null, MapDispatchPropsType, null, AppStateType>(null, {
		saveProfile,
	})
)(ProfileContainer)

type MapDispatchPropsType = {
	saveProfile: (profile: ProfileType) => any
}
type PropsType = MapDispatchPropsType
