import React from "react";
import {Field, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../utils/validators";

const maxLengthString20 = maxLengthString(20);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.onLogin(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"}
                       placeholder={"Login"}
                       type={"email"}
                       component={Input}
                       validate={[required, maxLengthString20]}
                />
            </div>
            <div>
                <Field name={"password"}
                       placeholder={"Password"}
                       type={"password"}
                       component={Input}
                       validate={[required, maxLengthString20]}
                />
            </div>
            <div>
                <Field name={"rememberMe"}
                       type={"checkbox"}
                       component={"input"}
                />
                <span>remember me</span>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

let LoginReduxForm = reduxForm(
    {form: 'login'}
)(LoginForm)

export default Login;