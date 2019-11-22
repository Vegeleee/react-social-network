import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = ({isAuth, login}) => {
	return (
		<header className={classes.header}>
			<img src='https://www.weddingprofessionalsofcolumbus.com/wp-content/uploads/logo-ex-7.png' />

			<div className={classes.loginBlock}>
				{
					isAuth ? login :
					<NavLink to={'/login'}>Login</NavLink>
				}
			</div>
		</header>
	);
};

export default Header;