import React from 'react';
import classes from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li className={classes.item}>Messages</li>
				<li className={classes.item}>Profile</li>
				<li className={classes.item}>News</li>
				<li className={classes.item}>Music</li>
				<li className={classes.item}></li>
			</ul>
		</nav>
	);
};

export default Navbar;