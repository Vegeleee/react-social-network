import React, { useState, useEffect } from 'react'
import classes from './ProfileStatus.module.scss'

const ProfileStatus = props => {

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

	const onStatusChange = (e) => {
		setStatus(e.target.value)
	}

	return (
		<div>
			{!editMode &&
				<div>
					<span className={classes.status}
						onDoubleClick={activateEditMode}>
						{props.status || "------"}
					</span>
				</div>
			}

			{editMode &&
				<div>
					<input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
				</div>
			}
		</div>
	);

};

export default ProfileStatus