import {ContactsType} from "../redux/profile-reducer";

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type UserType = {
    id: number,
    name: string,
    photos: PhotosType,
    status: null | string,
    followed: boolean
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}