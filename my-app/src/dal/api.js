import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userApi = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    }
}

export const authApi = {
    getAuth: () => {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    }
}

export const profileApi = {
    getProfile: (userId) => {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}

export const followApi = {
    onFollow: (userId) => {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    onUnfollow: (userId) => {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}