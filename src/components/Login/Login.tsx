import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from './../common/FormsControls/FormsControls.module.scss'
import classes from './Login.module.scss'
import { AppStateType } from '../../redux/store'

type LoginFormOwnProps = {
	captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit} className={classes.loginForm}>
			{createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input, { type: 'text' })}
			{createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
			{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'Remember me')}

			{captchaUrl && <img src={captchaUrl} alt='captcha' />}
			{captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, { type: 'text' })}

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStatePropsType = {
	captchaUrl: string | null
	isAuth: boolean
}

type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string 
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ isAuth, login, captchaUrl }) => {
	const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)