import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../utils/validators";
import classes from "../Login/Login.module.css";
import {MapDispatchPropsType, MapStateToPropsType} from "./LoginContainer";

const maxLengthString20 = maxLengthString(20);

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>

type LoginFormOwnProps = {
    captcha: string | null
}

const Login: FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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
                {createField<LoginFormValuesKeysType>("Email", "email",[required, maxLengthString20], Input)}
            </div>
            <div>
                {createField<LoginFormValuesKeysType>("Password", "password",[required, maxLengthString20], Input, {type: "password"})}
            </div>
            <div>
                {createField<LoginFormValuesKeysType>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "rememberMe")}
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
                    {createField<LoginFormValuesKeysType>(undefined, "captcha", [], Input, {type: "captcha"})}
                </div>
            }
        </form>
    );
}

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
    {form: 'login'}
)(LoginForm)

export default Login;