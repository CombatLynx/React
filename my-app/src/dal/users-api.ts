import {GetItemsType, instance, ResponseType} from "./api";

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
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