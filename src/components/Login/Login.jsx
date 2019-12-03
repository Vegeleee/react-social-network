import React from 'react';
import { reduxForm, Field } from 'redux-form';

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field type="text" placeholder="Login" name="login" component="input" />
			</div>
			<div>
				<Field type="password" placeholder="Password" name="password" component="input" />
			</div>
			<div>
				<Field type="checkbox" name="rememberMe" component="input" /> Remember me
			</div>
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = props => {
	const onSubmit = (formData) => {
		console.log(formData);
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default Login;