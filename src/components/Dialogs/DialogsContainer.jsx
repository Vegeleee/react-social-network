import React from 'react';
import { sendMessage, updateNewMessageText } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';

const AuthRedirectComponent = withAuthRedirect(Dialogs);

const mapStateToProps = state =>
	({
		dialogsPage: state.dialogsPage
	});

export default connect(mapStateToProps, {sendMessage, updateNewMessageText})(AuthRedirectComponent);