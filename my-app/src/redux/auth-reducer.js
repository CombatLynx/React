import {authAPI} from "../dal/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA';

let initialReducer = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export const setAuthUserDataActionCreator = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}
    }
}

export const getAuthThunkCreator = () => {
    return (dispatch) => {
        return authAPI.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserDataActionCreator(id, email, login, true));
                }
            });
    }
}

export const logInThunkCreator = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.logIn(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator())
                } else {
                    let messageResponse = response.data.messages;
                    messageResponse && messageResponse.length > 0
                        ? dispatch(stopSubmit('login', {_error: messageResponse}))
                        : dispatch(stopSubmit('login', {_error: `There's a mistake somewhere`}))
                }
            })
    }
}

export const logOutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataActionCreator(null, null, null, false));
                }
            })
    }
}

export default authReducer;