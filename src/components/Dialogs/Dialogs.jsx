import React from 'react';
import classes from './Dialogs.module.css';

const Dialogs = (props) => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				<div className={`${classes.dialog} ${classes.active}`}>Danil</div>
				<div className={classes.dialog}>Slava</div>
				<div className={classes.dialog}>Maria</div>
				<div className={classes.dialog}>Sasha</div>
				<div className={classes.dialog}>Aleksey</div>
				<div className={classes.dialog}>Vlad</div>
			</div>
			<div className={classes.messages}>
				<div className={classes.message}>Hi</div>
				<div className={classes.message}>How are you</div>
				<div className={classes.message}>Yo!</div>
			</div>
		</div>
	);
};

export default Dialogs;