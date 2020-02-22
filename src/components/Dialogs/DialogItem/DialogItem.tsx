import React from 'react'
import classes from './DialogItem.module.scss'
import {NavLink} from 'react-router-dom'


type PropsType = {
	id: number
	name: string
}

const DialogItem: React.FC<PropsType> = ({ id, name }) => {
	const path = `/dialogs/${id}`;

	return (
		<div className={classes.dialog}>
			<NavLink to={path} activeClassName={classes.active}>{name}</NavLink>
		</div>
	)
}

export default DialogItem