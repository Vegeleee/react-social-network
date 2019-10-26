import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const Dialogs = (props) => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				<div className={`${classes.dialog} ${classes.active}`}>Danil</div>
				<div className={classes.dialog}>
					<NavLink to='/dialogs/1'>Slava</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/dialogs/2'>Maria</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/dialogs/3'>Sasha</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/dialogs/4'>Aleksey</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/dialogs/5'>Vlad</NavLink>
				</div>
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