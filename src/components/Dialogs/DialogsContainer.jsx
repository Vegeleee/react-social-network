import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {
	const state = props.store.getState();

	const sendMessage = () => {
		props.store.dispatch(sendMessageActionCreator());
	};

	const updateNewMessageText = (newText) => {
		props.store.dispatch(updateNewMessageTextActionCreator(newText));
	};

	return (
		<Dialogs sendMessage={sendMessage}
						 updateNewMessageText={updateNewMessageText}
						 dialogsPage={state.dialogsPage} />
	);
};

export default DialogsContainer;