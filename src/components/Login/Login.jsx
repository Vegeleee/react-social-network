import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css'

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field type="text" placeholder="Email" name="email" component={Input}
					validate={[required]} />
			</div>
			<div>
				<Field type="password" placeholder="Password" name="password" component={Input}
					validate={[required]} />
			</div>
			<div>
				<Field type="checkbox" name="rememberMe" component={Input} /> Remember me
			</div>
			{props.error && <div className={style.formSummaryError}>
				{props.error}
			</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = ({isAuth, login}) => {
	const onSubmit = (formData) => {
		login(formData.email, formData.password, formData.rememberMe);
	}

	if (isAuth) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);