import React from 'react'
import { useSelector } from 'react-redux'
import { Field, Form, Formik, FormikHelpers } from 'formik'

import { FilterType } from '../../redux/users-reducer'

import { getFilter } from '../../redux/users-selectors'

const usersSearchFormValidate = (values: FormType) => {
	const errors = {}
	return errors
}

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
	term: string
	friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
	const filter = useSelector(getFilter)

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
				enableReinitialize
				initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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
