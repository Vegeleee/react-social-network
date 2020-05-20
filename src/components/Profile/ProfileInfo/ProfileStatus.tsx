import React, { useState, useEffect, ChangeEvent } from 'react'
import classes from './ProfileStatus.module.scss'

const ProfileStatus: React.FC<PropsType> = (props) => {
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const activateEditMode = () => {
		if (props.isOwner) {
			setEditMode(true)
		}
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value)
	}

	return (
		<div>
			{!editMode && (
				<div>
					<span className={classes.status} onDoubleClick={activateEditMode}>
						{props.status || '------'}
					</span>
				</div>
			)}

			{editMode && (
				<div>
					<input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
				</div>
			)}
		</div>
	)
}

export default ProfileStatus

type PropsType = {
	status: string
	isOwner: boolean
	updateStatus: (status: string) => void
}
