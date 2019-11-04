import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updateNewPostText, sendMessage, updateNewMessageText} from './redux/state';
import {BrowserRouter} from 'react-router-dom';

export let renderEntireTree = (state) => {
	ReactDOM.render(<BrowserRouter>
		<App
			state={state}
			addPost={addPost}
			updateNewPostText={updateNewPostText}
			sendMessage={sendMessage}
			updateNewMessageText={updateNewMessageText} />
	</BrowserRouter>, document.getElementById('root'));
};
