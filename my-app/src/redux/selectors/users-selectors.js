import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.userPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user => true);
})

export const getPageSize = (state) => {
    return state.userPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.userPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.userPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.userPage.isFetching;
}

export const getIsFollowing = (state) => {
    return state.userPage.isFollowing;
}

export const getPortionSize = (state) => {
    return state.userPage.portionSize;
}