import React from 'react'
import classes from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header: React.FC<PropsType> = ({ isAuth, login, logout }) => {
	return (
		<header className={classes.header}>
			<NavLink to={'/profile'}>
				<img
					className={classes.logo}
					src="https://www.doodle.tj/wp-content/uploads/2019/06/xreact2.png.pagespeed.ic.cFqX4FyKm1.png"
					alt="Logo"
				/>
			</NavLink>

			<div className={classes.loginBlock}>
				{isAuth ? (
					<div>
						<div className={classes.login}>{login}</div>
						<button onClick={logout}>Log out</button>
					</div>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div>
		</header>
	)
}

export default Header

type PropsType = {
	isAuth: boolean
	login: string | null
	logout: () => void
}
