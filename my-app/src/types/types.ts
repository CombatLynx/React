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