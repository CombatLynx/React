import {authAPI, ResultCodes} from "../dal/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA: string = 'auth/SET-USER-DATA';
const SET_CAPTCHA: string = 'auth/SET-CAPTCHA';

type InitialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: false | boolean,
    captcha: null | string
}

let initialReducer: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state: InitialStateType = initialReducer, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

type SetDataPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | null
}

type SetAuthUserDataActionCreatorType = {
    type: typeof SET_USER_DATA,
    data: SetDataPayloadType
}

type SetDataCaptchaType = {
    captcha: string | null
}

type GetCaptchaActionCreatorType = {
    type: typeof SET_CAPTCHA,
    data: SetDataCaptchaType
}

export const setAuthUserDataActionCreator = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionCreatorType => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}
    }
}

export const getCaptchaActionCreator = (captcha: string | null): GetCaptchaActionCreatorType => {
    return {
        type: SET_CAPTCHA,
        data: {captcha}
    }
}

export const getAuthThunkCreator = () => {
    return (dispatch: any) => {
        return authAPI.getAuth()
            .then(data => {
                if (data.resultCode === ResultCodes.SUCCESS) {
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserDataActionCreator(id, email, login, true));
                }
            });
    }
}

export const logInThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return (dispatch: any) => {
        authAPI.logIn(email, password, rememberMe, captcha)
            .then(data => {
                if (data.resultCode === ResultCodes.SUCCESS) {
                    dispatch(getAuthThunkCreator())
                } else if (data.resultCode === ResultCodes.ERROR) {
                    dispatch(captchaThunkCreator())
                    let messageResponse = data.messages;
                    messageResponse && messageResponse.length > 0
                        ? dispatch(stopSubmit('login', {_error: messageResponse}))
                        : dispatch(stopSubmit('login', {_error: `There's a mistake somewhere`}))
                }
            })
    }
}

export const logOutThunkCreator = () => {
    return (dispatch: any) => {
        authAPI.logOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataActionCreator(null, null, null, false));
                }
            })
    }
}

export const captchaThunkCreator = () => {
    return async (dispatch: any) => {
        const response = await authAPI.getCaptcha();
        const captcha = response.url;
        dispatch(getCaptchaActionCreator(captcha));
    }
}

export default authReducer;