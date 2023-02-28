import {GetCaptchaType, instance, ResponseType} from "./api";

type GetAuthDataType = {
    id: number,
    email: string,
    login: string
}

type LogInResponseDataType = {
    data: {
        userId: number
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get<ResponseType<GetAuthDataType>>(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => {
        return instance.post<ResponseType<LogInResponseDataType>>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        })
            .then(response => {
                return response.data;
            })
    },
    logOut: () => {
        return instance.delete<ResponseType>(`auth/login`);
    },
    getCaptcha: () => {
        return instance.get<GetCaptchaType>(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    }
}