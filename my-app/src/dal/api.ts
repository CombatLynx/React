import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    onFollow: (userId: number) => {
        return instance.post(`follow/${userId}`)
    },
    onUnfollow: (userId: number) => {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getStatusProfile: (userId: number) => {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatusProfile: (status: string) => {
        return instance.put(`profile/status`, {status: status})
    },
    updatePhotoProfile: (photoFile: any) => {
        let formData = new FormData();
        formData.append('file', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    saveProfileInfo: (profile: ProfileType) => {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodes {
    SUCCESS = 0,
    ERROR = 1
}

type GetAuthType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodes,
    messages: Array<string>
}

export const authAPI = {
    getAuth: () => {
        return instance.get<GetAuthType>(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => {
        return instance.post(`auth/login`, {email: email, password: password, rememberMe: rememberMe, captcha: captcha})
            .then(response => {
                return response.data;
            })
    },
    logOut: () => {
        return instance.delete(`auth/login`);
    },
    getCaptcha: () => {
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    }
}