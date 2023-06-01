import {ResultCodes} from "../dal/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../dal/auth-api";

enum typesActions {
    SET_USER_DATA = 'auth/SET-USER-DATA',
    SET_CAPTCHA = 'auth/SET-CAPTCHA'
}

export type InitialStateType = {
    userId: any,
    email: null | string,
    login: null | string,
    isAuth: false | boolean,
    captcha: null | string
}

type ActionsType = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialReducer: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.SET_USER_DATA:
        case typesActions.SET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actionCreators = {
    setAuthUserDataActionCreator: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: typesActions.SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaActionCreator: (captcha: string | null) => ({
        type: typesActions.SET_CAPTCHA,
        payload: {captcha}
    } as const)
}

export const getAuthThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.getAuth()
        if (data.resultCode === ResultCodes.SUCCESS) {
            let {id, email, login} = data.data;
            dispatch(actionCreators.setAuthUserDataActionCreator(id, email, login, true));
        }
    }
}

export const logInThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch: any) => {
        const data = await authAPI.logIn(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.SUCCESS) {
            dispatch(getAuthThunkCreator())
        } else if (data.resultCode === ResultCodes.ERROR) {
            dispatch(captchaThunkCreator())
            let messageResponse = data.messages;
            messageResponse && messageResponse.length > 0
                ? dispatch(stopSubmit('login', {_error: messageResponse}))
                : dispatch(stopSubmit('login', {_error: `There's a mistake somewhere`}))
        }
    }
}

export const logOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logOut()
        if (response.data.resultCode === ResultCodes.SUCCESS) {
            dispatch(actionCreators.setAuthUserDataActionCreator(null, null, null, false));
        }
    }
}

export const captchaThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.getCaptcha();
        const captcha = data.url;
        dispatch(actionCreators.getCaptchaActionCreator(captcha));
    }
}

export default authReducer;