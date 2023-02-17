import {getAuthThunkCreator} from "./auth-reducer";

const INITIALIZE_USER: string = 'app/INITIALIZE-USER';

type InitialStateType = {
    initialized: boolean
}

let initialReducer: InitialStateType = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialReducer, action: any): InitialStateType => {
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

type InitializeUserActionCreatorType = {
    type: typeof INITIALIZE_USER
}

export const initializeUserActionCreator = (): InitializeUserActionCreatorType => {
    return {
        type: INITIALIZE_USER
    }
}

export const initializeUserThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(getAuthThunkCreator());
    Promise.all([promise])
        .then(() => {
            dispatch(initializeUserActionCreator())
        })
}

export default appReducer;