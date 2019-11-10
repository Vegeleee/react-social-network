import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';


const DialogsContainer = (props) => {
	// const state = props.store.getState();

	// const sendMessage = () => {
	// 	props.store.dispatch(sendMessageActionCreator());
	// };

	// const updateNewMessageText = (newText) => {
	// 	props.store.dispatch(updateNewMessageTextActionCreator(newText));
	// };

	return (
		<StoreContext.Consumer>
			{store => 
				{
					const state =  store.getState();

					const sendMessage = () => {
						 store.dispatch(sendMessageActionCreator());
					};
				
					const updateNewMessageText = (newText) => {
						 store.dispatch(updateNewMessageTextActionCreator(newText));
					};

					return (
						<Dialogs sendMessage={sendMessage}
										updateNewMessageText={updateNewMessageText}
										dialogsPage={state.dialogsPage} />
					)
				}
			}
		</StoreContext.Consumer>
	);
};

export default DialogsContainer;