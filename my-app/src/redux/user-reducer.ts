import {userAPI} from "../dal/api";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

enum ActionTypes {
    FOLLOW = 'user/FOLLOW',
    UNFOLLOW = 'user/UNFOLLOW',
    SET_USERS = 'user/SET-USERS',
    SET_CURRENT_PAGE = 'user/SET-CURRENT-PAGE',
    SET_USERS_TOTAL_COUNT = 'user/SET-USERS-TOTAL-COUNT',
    TOGGLE_IS_FETCHING = 'user/TOGGLE-IS-FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE-IS-FOLLOWING-PROGRESS'
}

const limitCountUsers: number = 500;

type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    portionSize: number,
    currentPage: number,
    isFetching: boolean,
    isFollowing: Array<number>,
    fake: number
}

let initialReducer: InitialStateType = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    portionSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>,
    fake: 0
}

type ActionCreatorsTypes =
    FollowActionCreatorType
    | UnfollowActionCreatorType
    | SetUsersActionCreatorType
    | SetCurrentPageActionCreatorType
    | SetTotalCountActionCreatorType
    | SetIsFetchingActionCreatorType
    | SetFollowingProgressActionCreatorType

const usersReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    switch (action.type) {
        case ActionTypes.FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case ActionTypes.UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case ActionTypes.SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case ActionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case ActionTypes.SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount - (action.totalCount - limitCountUsers)
            }
        case ActionTypes.TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.toggleIsFetching
            }
        case ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowing: action.toggleIsFollowing
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type FollowActionCreatorType = {
    type: ActionTypes.FOLLOW,
    userId: number
}

export const followActionCreator = (userId: number): FollowActionCreatorType => {
    return {
        type: ActionTypes.FOLLOW,
        userId: userId
    }
}

type UnfollowActionCreatorType = {
    type: ActionTypes.UNFOLLOW,
    userId: number
}

export const unfollowActionCreator = (userId: number): UnfollowActionCreatorType => {
    return {
        type: ActionTypes.UNFOLLOW,
        userId: userId
    }
}

type SetUsersActionCreatorType = {
    type: ActionTypes.SET_USERS,
    users: Array<UserType>
}

export const setUsersActionCreator = (users: Array<UserType>): SetUsersActionCreatorType => {
    return {
        type: ActionTypes.SET_USERS,
        users: users
    }
}

type SetCurrentPageActionCreatorType = {
    type: ActionTypes.SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageActionCreatorType => {
    return {
        type: ActionTypes.SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}

type SetTotalCountActionCreatorType = {
    type: ActionTypes.SET_USERS_TOTAL_COUNT,
    totalCount: number
}

export const setTotalCountActionCreator = (countUsers: number): SetTotalCountActionCreatorType => {
    return {
        type: ActionTypes.SET_USERS_TOTAL_COUNT,
        totalCount: countUsers
    }
}

type SetIsFetchingActionCreatorType = {
    type: ActionTypes.TOGGLE_IS_FETCHING,
    toggleIsFetching: boolean
}

export const setIsFetchingActionCreator = (isFetching: boolean): SetIsFetchingActionCreatorType => {
    return {
        type: ActionTypes.TOGGLE_IS_FETCHING,
        toggleIsFetching: isFetching
    }
}

type SetFollowingProgressActionCreatorType = {
    type: ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
    toggleIsFollowing: boolean,
    userId: number
}

export const setFollowingProgressActionCreator = (isFollow: boolean, userId: number): SetFollowingProgressActionCreatorType => {
    return {
        type: ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
        toggleIsFollowing: isFollow,
        userId: userId
    }
}

// the first option
type DispatchType = Dispatch<ActionCreatorsTypes>;
type GetState = () => AppStateType;

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: DispatchType, getState: GetState) => {
        dispatch(setIsFetchingActionCreator(true));
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(setIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(data.items));
        dispatch(setTotalCountActionCreator(data.totalCount));
        dispatch(setCurrentPageActionCreator(currentPage));
    }
}

// the second option
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorsTypes>;

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        let response = await userAPI.onFollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(followActionCreator(userId));
        }
        dispatch(setFollowingProgressActionCreator(false, userId));
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        let response = await userAPI.onUnfollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(unfollowActionCreator(userId));
        }
        dispatch(setFollowingProgressActionCreator(false, userId));
    }
}

export default usersReducer;