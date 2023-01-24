import {userAPI} from "../dal/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialReducer = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [],
    fake: 0
}

const usersReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case "FAKE":
            return {
                ...state,
                fake: state.fake + 1
            }
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
                totalUsersCount: action.totalCount - (action.totalCount - 200)
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

export const followActionCreator = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}

export const unfollowActionCreator = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsersActionCreator = (users) => {
    return {
        type: SET_USERS,
        users: users
    }
}

export const setCurrentPageActionCreator = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}

export const setTotalCountActionCreator = (countUsers) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        totalCount: countUsers
    }
}

export const setIsFetchingActionCreator = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        toggleIsFetching: isFetching
    }
}

export const setFollowingProgressActionCreator = (isFollow, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        toggleIsFollowing: isFollow,
        userId: userId
    }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setIsFetchingActionCreator(false));
                dispatch(setUsersActionCreator(data.items));
                dispatch(setTotalCountActionCreator(data.totalCount));
                dispatch(setCurrentPageActionCreator(currentPage));
            });
        }
}

export const followThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        userAPI.onFollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followActionCreator(userId));
                }
                dispatch(setFollowingProgressActionCreator(false, userId));
            });
        }
}

export const unfollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgressActionCreator(true, userId));
        userAPI.onUnfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowActionCreator(userId));
                }
                dispatch(setFollowingProgressActionCreator(false, userId));
            });
        }
}

export default usersReducer;