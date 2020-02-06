import React from 'react';
import classes from './FormsControls.module.scss';
import { Field } from 'redux-form';


const FormControl = ({ meta, children }) => {
	const hasError = meta.error && meta.touched;

	return (
		<div className={`${classes.formControl} ${hasError ? classes.error : ''}`}>
			<div>
				{children}
			</div>
			{hasError && <div className={classes.errorText}>{meta.error}</div>}
		</div>
	);
};

export const Textarea = (props) => {
	const { input, ...restProps } = props;
	return (
		<FormControl {...restProps}><textarea {...input} {...restProps} /></FormControl>
	);
};

export const Input = (props) => {
	const { input, ...restProps } = props;
	return (
		<FormControl {...restProps}><input {...input} {...restProps} /></FormControl>
	);
};

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
	return (
		<div>
			<Field
				placeholder={placeholder}
				name={name}
				component={component}
				validate={validators}
				{...props} /> {text}
		</div>
	);
}