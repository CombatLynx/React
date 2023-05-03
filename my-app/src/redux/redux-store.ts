import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messageReducer,
    sidebar: sidebarReducer,
    userPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    form: formReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>
type AppAction = ReturnType<typeof store.dispatch>
export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;