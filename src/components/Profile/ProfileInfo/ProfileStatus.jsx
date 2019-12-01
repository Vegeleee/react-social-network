import React from 'react';

class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status
	}

	onStatusChange = (e) => {
		this.setState({
			status: e.target.value
		});
	}

	activateEditMode = () => {
		this.setState({
			editMode: true
		});
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		});
		this.props.updateStatus(this.state.status)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			});
		}
	}

	render() {
		return (
			<div>
				{!this.state.editMode &&
					<div>
						<span onDoubleClick={ this.activateEditMode }>{this.props.status || "------"}</span>
					</div>
				}

				{this.state.editMode &&
					<div>
						<input autoFocus={true} onBlur={ this.deactivateEditMode } onChange={ this.onStatusChange } value={this.state.status} />
					</div>
				}
			</div>
		);
	}

};

export default ProfileStatus;