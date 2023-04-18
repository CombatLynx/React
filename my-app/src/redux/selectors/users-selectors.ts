import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.userPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.userPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.userPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.userPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.userPage.isFetching;
}

export const getIsFollowing = (state: AppStateType) => {
    return state.userPage.isFollowing;
}

export const getPortionSize = (state: AppStateType) => {
    return state.userPage.portionSize;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.userPage.filter;
}