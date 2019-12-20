import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/store';
import withSuspense from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className='app-wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app-wrapper-content'>
					<Switch>
						<Redirect exact from='/' to='/profile' />

						<Route path='/profile/:userId?'
							render={() => <ProfileContainer />} />

						<Route path='/dialogs'
							render={withSuspense(DialogsContainer)} />

						<Route path='/users'
							render={() => <UsersContainer />} />

						<Route path='/news' component={News} />
						<Route path='/music' component={Music} />
						<Route path='/settings' component={Settings} />

						<Route path='/login'
							render={() => <Login />} />

						<Route path='*'
							render={() => <div>404 NOT FOUND</div>} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	initialized: state.app.initialized
});

const AppWithRouter = compose(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App);

const MainApp = props => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppWithRouter />
			</Provider>
		</BrowserRouter>
	);
};

export default MainApp;