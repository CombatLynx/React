import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userAPI = {
    getUsers: async (currentPage, pageSize) => {
        let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    onFollow: async (userId) => {
        return await instance.post(`follow/${userId}`)
    },
    onUnfollow: async (userId) => {
        return await instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile: (userId) => {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getStatusProfile: (userId) => {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatusProfile: (status) => {
        return instance.put(`/profile/status`, {status: status})
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    logIn: (email, password, rememberMe) => {
        return instance.post(`auth/login`, {email: email, password: password, rememberMe: rememberMe});
    },
    logOut: () => {
        return instance.delete(`auth/login`);
    }
}