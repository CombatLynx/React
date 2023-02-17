import {userAPI} from "../dal/api";
import {UserType} from "../types/types";

const FOLLOW: string = 'user/FOLLOW';
const UNFOLLOW: string = 'user/UNFOLLOW';
const SET_USERS: string = 'user/SET-USERS';
const SET_CURRENT_PAGE: string = 'user/SET-CURRENT-PAGE';
const SET_PORTION_SIZE: string = 'users/SET-PORTION-SIZE';
const SET_USERS_TOTAL_COUNT: string = 'user/SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING: string = 'user/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS: string = 'user/TOGGLE-IS-FOLLOWING-PROGRESS';

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
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    portionSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowing: [],
    fake: 0
}

const usersReducer = (state: InitialStateType = initialReducer, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount - (action.totalCount - limitCountUsers)
            }
        case SET_PORTION_SIZE:
            return {
                ...state,
                portionSize: state.portionSize
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.toggleIsFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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
    type: typeof FOLLOW,
    userId: number
}

export const followActionCreator = (userId: number): FollowActionCreatorType => {
    return {
        type: FOLLOW,
        userId: userId
    }
}

type UnfollowActionCreatorType = {
    type: typeof UNFOLLOW,
    userId: number
}

export const unfollowActionCreator = (userId: number): UnfollowActionCreatorType => {
    return {
        type: UNFOLLOW,
        userId: userId
    }
}

type PortionSizeActionCreatorType = {
    type: typeof SET_PORTION_SIZE,
    portionSize: number
}

export const portionSizeActionCreator = (portionSize: number): PortionSizeActionCreatorType => {
    return {
        type: SET_PORTION_SIZE,
        portionSize: portionSize
    }
}

type SetUsersActionCreatorType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsersActionCreator = (users: Array<UserType>): SetUsersActionCreatorType  => {
    return {
        type: SET_USERS,
        users: users
    }
}

type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageActionCreatorType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}

type SetTotalCountActionCreatorType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    totalCount: number
}

export const setTotalCountActionCreator = (countUsers: number): SetTotalCountActionCreatorType => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        totalCount: countUsers
    }
}

type SetIsFetchingActionCreatorType = {
    type: typeof TOGGLE_IS_FETCHING,
    toggleIsFetching: boolean
}

export const setIsFetchingActionCreator = (isFetching: boolean): SetIsFetchingActionCreatorType => {
    return {
        type: TOGGLE_IS_FETCHING,
        toggleIsFetching: isFetching
    }
}

type SetFollowingProgressActionCreatorType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    toggleIsFollowing: boolean,
    userId: number
}

export const setFollowingProgressActionCreator = (isFollow: boolean, userId: number): SetFollowingProgressActionCreatorType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        toggleIsFollowing: isFollow,
        userId: userId
    }
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setIsFetchingActionCreator(true));
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(setIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(data.items));
        dispatch(setTotalCountActionCreator(data.totalCount));
        dispatch(setCurrentPageActionCreator(currentPage));
    }
}

export const followThunkCreator = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        let response = await userAPI.onFollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(followActionCreator(userId));
        }
        dispatch(setFollowingProgressActionCreator(false, userId));
    }
}

export const unfollowThunkCreator = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        let response = await userAPI.onUnfollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(unfollowActionCreator(userId));
        }
        dispatch(setFollowingProgressActionCreator(false, userId));
    }
}

export default usersReducer;