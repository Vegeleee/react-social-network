import React from 'react';
import classes from './FormsControls.module.css';


const FormControl = ({ meta, children }) => {
	const hasError = meta.error && meta.touched;

	return (
		<div className={`${classes.formControl} ${hasError ? classes.error : ''}`}>
			<div>
				{children}
			</div>
			{ hasError && <span>{meta.error}</span> }
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