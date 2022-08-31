import {PhotosType, ProfileType} from "../types/types";
import {APIResponseType, instance} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status})
    },
    savePhoto(photoFile: File) {

        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
    },
}