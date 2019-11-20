import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';


const mapStateToProps = state =>
	({
		dialogsPage: state.dialogsPage
	});

const mapDispatchToProps = dispatch =>
	({
		sendMessage() {
			dispatch(sendMessageActionCreator());
		},

		updateNewMessageText(newText) {
			dispatch(updateNewMessageTextActionCreator(newText));
		}
	});

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);