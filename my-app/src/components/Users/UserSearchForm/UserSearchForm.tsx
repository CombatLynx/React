import {Formik, FormikHelpers, FormikValues} from "formik";

const UserSearchForm = () => {
    const submitForm = (values: FormikValues, actions: FormikHelpers<{name: string}>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }

    return (
        <div>
            <Formik
                initialValues={{name: ''}}
                onSubmit={submitForm}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="name"
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default UserSearchForm;