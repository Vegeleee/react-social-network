import React from 'react'
import { HashRouter, Route, withRouter, Switch, Redirect, Link } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { compose } from 'redux'

import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Users } from './components/Users/Users'
import ProfileContainer from './components/Profile/ProfileContainer'
import { Header } from './components/Header/Header'
import Login from './components/Login/Login'
import Preloader from './components/common/Preloader/Preloader'

import { initializeApp } from './redux/app-reducer'

import store, { AppStateType } from './redux/store'

import withSuspense from './hoc/withSuspense'

import 'antd/dist/antd.css'
import './App.scss'

import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const SuspendedDialogs = withSuspense(DialogsContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert(e)
	}

	componentDidMount() {
		this.props.initializeApp()

		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	render() {
		if (!this.props.initialized) {
			return (
				<div className="appPreloader">
					<Preloader />
				</div>
			)
		}

		return (
			<Layout>
				<Header />
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
						<Sider className="site-layout-background" width={200}>
							<Menu
								mode="inline"
								// defaultSelectedKeys={['1']}
								// defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}
							>
								<SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
									<Menu.Item key="1">
										<Link to="/profile">Profile</Link>
									</Menu.Item>
									<Menu.Item key="2">
										<Link to="/dialogs">Messages</Link>
									</Menu.Item>
									<Menu.Item key="3">option3</Menu.Item>
									<Menu.Item key="4">option4</Menu.Item>
								</SubMenu>
								<SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
									<Menu.Item key="5">
										<Link to="/developers">Users</Link>
									</Menu.Item>
									<Menu.Item key="6">option6</Menu.Item>
									<Menu.Item key="7">option7</Menu.Item>
									<Menu.Item key="8">option8</Menu.Item>
								</SubMenu>
								<SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
									<Menu.Item key="9">option9</Menu.Item>
									<Menu.Item key="10">option10</Menu.Item>
									<Menu.Item key="11">option11</Menu.Item>
									<Menu.Item key="12">option12</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							<Switch>
								<Redirect exact from="/" to="/profile" />
								<Route path="/profile/:userId?" render={() => <ProfileContainer />} />
								<Route path="/dialogs" render={() => <SuspendedDialogs />} />
								<Route path="/developers" render={() => <Users />} />
								<Route path="/news" component={News} />
								<Route path="/music" component={Music} />
								<Route path="/settings" component={Settings} />
								<Route path="/login" render={() => <Login />} />
								<Route path="*" render={() => <div>404 NOT FOUND</div>} />
							</Switch>
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>

			// <div className="app-wrapper">
			// 	{/* header */}
			// 	<div className="app-wrapper-header">
			// 		<div className="inner">
			// 			<HeaderContainer />
			// 		</div>
			// 	</div>
			// 	{/* / header */}

			// 	{/* main */}
			// 	<div className="app-wrapper-main">
			// 		<div className="inner">
			// 			{/* navbar */}
			// 			<div className="app-wrapper-navbar">
			// 				<Navbar />
			// 			</div>
			// 			{/* / navbar */}

			// 			{/* content */}
			// 			<div className="app-wrapper-content">
			//
			// 			</div>
			// 			{/* / content */}
			// 		</div>
			// 	</div>
			// 	{/* / main */}
			// </div>
		)
	}
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
})

const AppWithRouter = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App)

const MainApp: React.FC = () => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppWithRouter />
			</Provider>
		</HashRouter>
	)
}

export default MainApp

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
	initializeApp: () => void
}
