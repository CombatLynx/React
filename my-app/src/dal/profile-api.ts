import {PhotosType, ProfileType} from "../types/types";
import {instance, ResponseType} from "./api";

type UpdatePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getStatusProfile: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatusProfile: (status: string) => {
        return instance.put<ResponseType>(`profile/status`, {status: status})
    },
    updatePhotoProfile: (photoFile: any) => {
        let formData = new FormData();
        formData.append('file', photoFile);
        return instance.put<ResponseType<UpdatePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    saveProfileInfo: (profile: ProfileType) => {
        return instance.put<ResponseType>(`profile`, profile)
    }
}