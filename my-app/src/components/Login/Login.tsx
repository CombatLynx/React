import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../utils/validators";
import classes from "../Login/Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logInThunkCreator} from "../../redux/auth-reducer";

const maxLengthString20 = maxLengthString(20);

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>

type LoginFormOwnProps = {
    captcha: string | null
}

const Login: FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captcha = useSelector((state: AppStateType) => state.auth.captcha)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch<any>(logInThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
    {form: 'login'}
)(LoginForm)

export default Login;