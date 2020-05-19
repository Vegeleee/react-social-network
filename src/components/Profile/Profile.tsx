import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileType } from '../../types/types'

type PropsType = {
	profile: ProfileType | null
	status: string
	isOwner: boolean
	updateStatus: any
	savePhoto: any
	saveProfile: any
}

const Profile: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
	return (
		<section>
			<ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile} />
			<MyPostsContainer />
		</section>
	)
}

export default Profile