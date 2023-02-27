import {authAPI, ResultCodes} from "../dal/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

enum ActionTypes {
    SET_USER_DATA = 'auth/SET-USER-DATA',
    SET_CAPTCHA = 'auth/SET-CAPTCHA'
}

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

type ActionCreatorsTypes = SetAuthUserDataActionCreatorType | GetCaptchaActionCreatorType

const authReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    switch (action.type) {
        case ActionTypes.SET_USER_DATA:
        case ActionTypes.SET_CAPTCHA:
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
    isAuth: false | boolean
}

type SetAuthUserDataActionCreatorType = {
    type: ActionTypes.SET_USER_DATA,
    data: SetDataPayloadType
}

type SetDataCaptchaType = {
    captcha: string | null
}

type GetCaptchaActionCreatorType = {
    type: ActionTypes.SET_CAPTCHA,
    data: SetDataCaptchaType
}

export const setAuthUserDataActionCreator = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionCreatorType => {
    return {
        type: ActionTypes.SET_USER_DATA,
        data: {userId, email, login, isAuth}
    }
}

export const getCaptchaActionCreator = (captcha: string | null): GetCaptchaActionCreatorType => {
    return {
        type: ActionTypes.SET_CAPTCHA,
        data: {captcha}
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorsTypes>;

export const getAuthThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.getAuth()
        if (data.resultCode === ResultCodes.SUCCESS) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserDataActionCreator(id, email, login, true));
        }
    }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const logInThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => {
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
            dispatch(setAuthUserDataActionCreator(null, null, null, false));
        }
    }
}

export const captchaThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.getCaptcha();
        const captcha = response.url;
        dispatch(getCaptchaActionCreator(captcha));
    }
}

export default authReducer;