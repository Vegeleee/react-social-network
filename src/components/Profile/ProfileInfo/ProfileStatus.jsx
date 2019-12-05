import React, { useState, useEffect } from 'react';

const ProfileStatus = props => {

	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
	}

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	}

	const onStatusChange = (e) => {
		setStatus(e.target.value);
	}

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.status !== this.props.status) {
	// 		this.setState({
	// 			status: this.props.status
	// 		});
	// 	}
	// }


	return (
		<div>
			{!editMode &&
				<div>
					<span onDoubleClick={ activateEditMode }>{props.status || "------"}</span>
				</div>
			}

			{editMode &&
				<div>
					<input autoFocus={true} onBlur={ deactivateEditMode } onChange={ onStatusChange } value={status} />
				</div>
			}
		</div>
	);

};

export default ProfileStatus;