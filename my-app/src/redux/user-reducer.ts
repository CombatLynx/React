import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {userAPI} from "../dal/users-api";
import {FormAction} from "redux-form";

enum typesActions {
    FOLLOW = 'user/FOLLOW',
    UNFOLLOW = 'user/UNFOLLOW',
    SET_USERS = 'user/SET-USERS',
    SET_CURRENT_PAGE = 'user/SET-CURRENT-PAGE',
    SET_USERS_TOTAL_COUNT = 'user/SET-USERS-TOTAL-COUNT',
    TOGGLE_IS_FETCHING = 'user/TOGGLE-IS-FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE-IS-FOLLOWING-PROGRESS',
    SET_FILTER = 'user/SET-FILTER'
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
    fake: number,
    filter: {
        term: string
    }
}

type ActionsType = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialReducer: InitialStateType = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    portionSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>,
    fake: 0,
    filter: {
        term: ''
    }
}

const usersReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case typesActions.UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case typesActions.SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case typesActions.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case typesActions.SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount - (action.totalCount - limitCountUsers)
            }
        case typesActions.TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.toggleIsFetching
            }
        case typesActions.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowing: action.toggleIsFollowing
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter(id => id !== action.userId)
            }
        case typesActions.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export const actionCreators = {
    followActionCreator: (userId: number) => ({
        type: typesActions.FOLLOW,
        userId: userId
    } as const),
    unfollowActionCreator: (userId: number) => ({
        type: typesActions.UNFOLLOW,
        userId: userId
    } as const),
    setUsersActionCreator: (users: Array<UserType>) => ({
        type: typesActions.SET_USERS,
        users: users
    } as const),
    setCurrentPageActionCreator: (currentPage: number) => ({
        type: typesActions.SET_CURRENT_PAGE,
        currentPage: currentPage
    } as const),
    setTotalCountActionCreator: (countUsers: number) => ({
        type: typesActions.SET_USERS_TOTAL_COUNT,
        totalCount: countUsers
    } as const),
    setIsFetchingActionCreator: (isFetching: boolean) => ({
        type: typesActions.TOGGLE_IS_FETCHING,
        toggleIsFetching: isFetching
    } as const),
    setFollowingProgressActionCreator: (isFollow: boolean, userId: number) => ({
        type: typesActions.TOGGLE_IS_FOLLOWING_PROGRESS,
        toggleIsFollowing: isFollow,
        userId: userId
    } as const),
    setFilterActionCreator: (term: string) => ({
        type: typesActions.SET_FILTER,
        payload: {term}
    } as const)
}

// type FollowActionCreatorType = {
//     type: ActionTypes.FOLLOW,
//     userId: number
// }
//
// export const followActionCreator = (userId: number): FollowActionCreatorType => {
//     return {
//         type: ActionTypes.FOLLOW,
//         userId: userId
//     }
// }
//
// type UnfollowActionCreatorType = {
//     type: ActionTypes.UNFOLLOW,
//     userId: number
// }
//
// export const unfollowActionCreator = (userId: number): UnfollowActionCreatorType => {
//     return {
//         type: ActionTypes.UNFOLLOW,
//         userId: userId
//     }
// }

// type SetUsersActionCreatorType = {
//     type: ActionTypes.SET_USERS,
//     users: Array<UserType>
// }
//
// export const setUsersActionCreator = (users: Array<UserType>): SetUsersActionCreatorType => {
//     return {
//         type: ActionTypes.SET_USERS,
//         users: users
//     }
// }

// type SetCurrentPageActionCreatorType = {
//     type: ActionTypes.SET_CURRENT_PAGE,
//     currentPage: number
// }
//
// export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageActionCreatorType => {
//     return {
//         type: ActionTypes.SET_CURRENT_PAGE,
//         currentPage: currentPage
//     }
// }

// type SetTotalCountActionCreatorType = {
//     type: ActionTypes.SET_USERS_TOTAL_COUNT,
//     totalCount: number
// }
//
// export const setTotalCountActionCreator = (countUsers: number): SetTotalCountActionCreatorType => {
//     return {
//         type: ActionTypes.SET_USERS_TOTAL_COUNT,
//         totalCount: countUsers
//     }
// }

// type SetIsFetchingActionCreatorType = {
//     type: ActionTypes.TOGGLE_IS_FETCHING,
//     toggleIsFetching: boolean
// }
//
// export const setIsFetchingActionCreator = (isFetching: boolean): SetIsFetchingActionCreatorType => {
//     return {
//         type: ActionTypes.TOGGLE_IS_FETCHING,
//         toggleIsFetching: isFetching
//     }
// }

// type SetFollowingProgressActionCreatorType = {
//     type: ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
//     toggleIsFollowing: boolean,
//     userId: number
// }
//
// export const setFollowingProgressActionCreator = (isFollow: boolean, userId: number): SetFollowingProgressActionCreatorType => {
//     return {
//         type: ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
//         toggleIsFollowing: isFollow,
//         userId: userId
//     }
// }

// type SetFilterActionCreatorType = {
//     type: ActionTypes.SET_FILTER,
//     payload: any
// }
//
// export const setFilterActionCreator = (term: string): SetFilterActionCreatorType => {
//     return {
//         type: ActionTypes.SET_FILTER,
//         payload: {term}
//     }
// }

export const getUsersThunkCreator = (currentPage: number, pageSize: number, term: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.setIsFetchingActionCreator(true));
        let data = await userAPI.getUsers(currentPage, pageSize, term);
        dispatch(actionCreators.setIsFetchingActionCreator(false));
        dispatch(actionCreators.setUsersActionCreator(data.items));
        dispatch(actionCreators.setTotalCountActionCreator(data.totalCount));
        dispatch(actionCreators.setCurrentPageActionCreator(currentPage));
        dispatch(actionCreators.setFilterActionCreator(term));
    }
}

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.setFollowingProgressActionCreator(true, userId));
        const response = await userAPI.onFollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreators.followActionCreator(userId));
        }
        dispatch(actionCreators.setFollowingProgressActionCreator(false, userId));
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.setFollowingProgressActionCreator(true, userId));
        const response = await userAPI.onUnfollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreators.unfollowActionCreator(userId));
        }
        dispatch(actionCreators.setFollowingProgressActionCreator(false, userId));
    }
}

export default usersReducer;