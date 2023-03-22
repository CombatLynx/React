import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../utils/validators";
import classes from "../Login/Login.module.css";
import {MapDispatchPropsType, MapStateToPropsType} from "./LoginContainer";

const maxLengthString20 = maxLengthString(20);

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}

type LoginFormOwnProps = {
    captcha: string | null
}

const Login: FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.onLogin(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    );
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
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
            {
                props.error &&
                <div className={classes["form-control__general_error"]}>
                    {props.error}
                </div>
            }
            {props.captcha && <img src={props.captcha} alt={"captcha"}/>}
            {props.captcha &&
                <div>
                    <Field name={"captcha"}
                           type={"captcha"}
                           component={"input"}
                    />
                </div>
            }
        </form>
    );
}

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
    {form: 'login'}
)(LoginForm)

export default Login;