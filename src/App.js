import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

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
					<Route path='/profile/:userId?'
						render={() => <ProfileContainer />} />
	
					<Route path='/dialogs'
						render={() => <DialogsContainer />} />
	
					<Route path='/users'
						render={() => <UsersContainer />} />
							
					<Route path='/news' component={News} />
					<Route path='/music' component={Music} />
					<Route path='/settings' component={Settings} />
					
					<Route path='/login'
						render={() => <Login />} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	initialized: state.app.initialized
});

export default compose(
	withRouter,
	connect(mapStateToProps, {initializeApp})
	)(App);