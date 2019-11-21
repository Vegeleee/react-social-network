import React from 'react';
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';


const mapStateToProps = state =>
	({
		dialogsPage: state.dialogsPage
	});

export default connect(mapStateToProps, {sendMessage, updateNewMessageText})(Dialogs);