import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'

import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

import { getProfile, getStatus } from '../../redux/profile-reducer'

import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/store'

type PathParamsType = {
	userId: string
}

type MatchType = {
	params: PathParamsType
}

export const Profile: React.FC<PropsType> = ({ saveProfile }) => {
	const match: MatchType = useRouteMatch()
	const dispatch = useDispatch()

	const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

	const isOwner = !match.params.userId
	const userId = +match.params.userId || authorizedUserId

	useEffect(() => {
		refreshProfile(userId)
	}, [userId])

	const refreshProfile = (userId: number | null) => {
		dispatch(getProfile(userId as number))
		dispatch(getStatus(userId as number))
	}

	if (!isAuth) return <Redirect to="/login" />

	return isAuth ? (
		<section>
			<ProfileInfo isOwner={isOwner} saveProfile={saveProfile} />
			<MyPostsContainer />
		</section>
	) : (
		<Redirect to="/login" />
	)
}

type PropsType = {
	saveProfile: (profile: ProfileType) => Promise<any>
}
