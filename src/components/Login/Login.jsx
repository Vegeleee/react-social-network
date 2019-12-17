import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField('Email', 'email', [required], Input, {type: 'text'})}
			{createField('Password', 'password', [required], Input, {type: 'password'})}
			{createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}
			
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {type: 'text'})}

			{error && !captchaUrl && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({isAuth, login, captchaUrl}) => {
	const onSubmit = (formData) => {
		login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	if (isAuth) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	);
};

const mapStateToProps = state => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);