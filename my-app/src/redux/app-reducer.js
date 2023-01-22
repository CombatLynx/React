import {getAuthThunkCreator} from "./auth-reducer";

const INITIALIZE_USER = 'INITIALIZE-USER';

let initialReducer = {
    initialized: false
}

const appReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case INITIALIZE_USER:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializeUserActionCreator = () => {
    return {
        type: INITIALIZE_USER
    }
}

export const initializeUserThunkCreator = () => (dispatch) => {
    let promise = dispatch(getAuthThunkCreator());
    Promise.all([promise])
        .then(() => {
            dispatch(initializeUserActionCreator())
        })
}

export default appReducer;