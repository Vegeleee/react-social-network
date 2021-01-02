import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Layout, Row, Col, Menu, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { logout } from '../../redux/auth-reducer'

import { AppStateType } from '../../redux/store'

export const Header: React.FC = () => {
	const dispatch = useDispatch()

	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const login = useSelector((state: AppStateType) => state.auth.login)

	const { Header } = Layout

	return (
		<Header className="header">
			<div className="logo" />
			<Row>
				<Col span={18}>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
						<Menu.Item key="1">
							<Link to="/developers">Developers</Link>
						</Menu.Item>
					</Menu>
				</Col>
				{isAuth ? (
					<>
						<Col span={3}>
							<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
						</Col>
						<Col span={3}>
							<Button onClick={() => dispatch(logout)}>Log out</Button>
						</Col>
					</>
				) : (
					<Col span={6}>
						<Button>
							<Link to={'/login'}>Login</Link>
						</Button>
					</Col>
				)}
			</Row>
		</Header>

		// <header className={classes.header}>
		// 	<NavLink to={'/profile'}>
		// 		<img
		// 			className={classes.logo}
		// 			src="https://www.doodle.tj/wp-content/uploads/2019/06/xreact2.png.pagespeed.ic.cFqX4FyKm1.png"
		// 			alt="Logo"
		// 		/>
		// 	</NavLink>

		// 	<div className={classes.loginBlock}>
		// 		{isAuth ? (
		// 			<div>
		// 				<div className={classes.login}>{login}</div>
		// 				<button onClick={logout}>Log out</button>
		// 			</div>
		// 		) : (
		// 			<NavLink to={'/login'}>Login</NavLink>
		// 		)}
		// 	</div>
		// </header>
	)
}
