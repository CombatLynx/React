import React from "react";
import {Field, reduxForm} from "redux-form";

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
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
                <Field name={"login"} placeholder={"Login"} type={"text"} component={"input"}/>
            </div>
            <div>
                <Field name={"password"} placeholder={"Password"} type={"text"} component={"input"}/>
            </div>
            <div>
                <Field name={"rememberMe"} type={"checkbox"} component={"input"}/>
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