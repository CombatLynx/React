import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export enum ResultCodes {
    SUCCESS = 0,
    ERROR = 1
}

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export type GetCaptchaType = {
    url: string
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}