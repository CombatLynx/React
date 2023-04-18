import {GetItemsType, instance, ResponseType} from "./api";

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            })
    },
    onFollow: (userId: number) => {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
    onUnfollow: (userId: number) => {
        return instance.delete(`follow/${userId}`)
    }
}