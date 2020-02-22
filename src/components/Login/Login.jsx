import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from './../common/FormsControls/FormsControls.module.scss'
import classes from './Login.module.scss'


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit} className={classes.loginForm}>
			{createField('Email', 'email', [required], Input, { type: 'text' })}
			{createField('Password', 'password', [required], Input, { type: 'password' })}
			{createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'Remember me')}

			{captchaUrl && <img src={captchaUrl} alt='captcha' />}
			{captchaUrl && createField('Symbols from image', 'captcha', [required], Input, { type: 'text' })}

			{error && !captchaUrl && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div className={classes.loginFormButton}>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ isAuth, login, captchaUrl }) => {
	const onSubmit = (formData) => {
		login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	if (isAuth) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div className={classes.loginContainer}>
			<div className={classes.login}>
				<h1 className={classes.loginTitle}>Login</h1>
				<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)