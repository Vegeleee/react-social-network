import React from 'react';
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = state =>
	({
		dialogsPage: state.dialogsPage
	});

export default compose(
	connect(mapStateToProps, {sendMessage, updateNewMessageText}),
	withAuthRedirect
)(Dialogs);