import {getAuthThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

enum ActionTypes {
    INITIALIZE_USER = 'app/INITIALIZE-USER'
}

type InitialStateType = {
    initialized: boolean
}

let initialReducer: InitialStateType = {
    initialized: false
}

type ActionCreatorsTypes = InitializeUserActionCreatorType

const appReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    switch (action.type) {
        case ActionTypes.INITIALIZE_USER:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type InitializeUserActionCreatorType = {
    type: ActionTypes.INITIALIZE_USER
}

export const initializeUserActionCreator = (): InitializeUserActionCreatorType => {
    return {
        type: ActionTypes.INITIALIZE_USER
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorsTypes>;

export const initializeUserThunkCreator = (): ThunkType => async (dispatch) => {
    const promise = dispatch(getAuthThunkCreator());
    Promise.all([promise])
        .then(() => {
            dispatch(initializeUserActionCreator())
        })
}

export default appReducer;