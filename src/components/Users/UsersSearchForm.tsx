import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'

import { FilterType } from '../../redux/users-reducer'

const usersSearchFormValidate = (values: FormType) => {
	const errors = {}
	return errors
}

type FormType = {
	term: string
	friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
	const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
		}

		onFilterChanged(filter)
		setSubmitting(false)
	}

	return (
		<div>
			<Formik
				initialValues={{ term: '', friend: 'null' }}
				validate={usersSearchFormValidate}
				onSubmit={submit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type="text" name="term" />
						<Field name="friend" as="select">
							<option value="null">All</option>
							<option value="true">Only followed</option>
							<option value="false">Only unfollowed</option>
						</Field>
						<button type="submit" disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
})

export default UsersSearchForm

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}
