import { FieldValidatorType } from '../../../utils/validators/validators'
import React from 'react'
import classes from './FormsControls.module.scss'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'

const FormControl: React.FC<FormControlPropsType> = ({ meta, children }) => {
	const hasError = meta.error && meta.touched

	return (
		<div className={`${classes.formControl} ${hasError ? classes.error : ''}`}>
			<div>{children}</div>
			{hasError && <div className={classes.errorText}>{meta.error}</div>}
		</div>
	)
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
	const { input, ...restProps } = props
	return (
		<FormControl {...restProps}>
			<textarea {...input} {...restProps} />
		</FormControl>
	)
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
	const { input, ...restProps } = props
	return (
		<FormControl {...restProps}>
			<input {...input} {...restProps} />
		</FormControl>
	)
}

export function createField<FormKeysType extends string>(
	placeholder: string | undefined,
	name: FormKeysType,
	validators: Array<FieldValidatorType>,
	component: React.FC<WrappedFieldProps>,
	props = {},
	text = ''
) {
	return (
		<div>
			<Field placeholder={placeholder} name={name} component={component} validate={validators} {...props} /> {text}
		</div>
	)
}

type FormControlPropsType = {
	meta: WrappedFieldMetaProps
}
