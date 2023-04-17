import {Field, Form, Formik, FormikValues} from "formik";
import {FC} from "react";

type PropsType = {
    onFilterChange: (filter: FormikValues) => void
}

const usersSearchFormValidate = (values: any) => {
    return {}
}

const UserSearchForm: FC<PropsType> = (props) => {
    const submitForm = (values: FormikValues, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        setTimeout(() => {
            props.onFilterChange(values)
            setSubmitting(false)
        }, 1000)
    }

    return (
        <Formik
            initialValues={{name: ''}}
            validate={usersSearchFormValidate}
            onSubmit={submitForm}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type={"text"} name={"term"}></Field>
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    );
}

export default UserSearchForm;