import React from 'react'
import classes from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<nav className={classes.nav}>
			<ul className={classes.navList}>
				<li className={classes.navListItem}>
					<NavLink to="/profile" activeClassName={classes.active}>
						Profile
					</NavLink>
				</li>
				<li className={classes.navListItem}>
					<NavLink to="/dialogs" activeClassName={classes.active}>
						Messages
					</NavLink>
				</li>
				<li className={classes.navListItem}>
					<NavLink to="/users" activeClassName={classes.active}>
						Users
					</NavLink>
				</li>
				<li className={classes.navListItem}>
					<NavLink to="/news" activeClassName={classes.active}>
						News
					</NavLink>
				</li>
				<li className={classes.navListItem}>
					<NavLink to="/music" activeClassName={classes.active}>
						Music
					</NavLink>
				</li>
				<li className={classes.navListItem}>
					<NavLink to="/settings" activeClassName={classes.active}>
						Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
