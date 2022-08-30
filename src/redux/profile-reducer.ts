import {profileApi, usersApi} from "../api/api";
import {AppThunk, TypedDispatch} from "./redux-store";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

export type ProfileReducerACType = AddPostACType | SetUserProfileType
    | SetStatusType | DeletePostType | SavePhotoSuccessType | SaveProfileUpdatesType

type AddPostACType = ReturnType<typeof addPost>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type DeletePostType = ReturnType<typeof deletePost>
type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
type SaveProfileUpdatesType = ReturnType<typeof saveProfileUpdates>


let initialState= {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ] as PostType[],
    profile:  null as ProfileType | null,
    status: ''
}

type InitialProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileReducerACType): InitialProfileStateType => {

    switch (action.type) {
        case "PROFILE/ADD-POST":
            debugger
            let newPost: PostType = {
                id: 3,
                message: action.newPostText,
                likeCounts: '0'
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case "PROFILE/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PROFILE/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case  "PROFILE/DELETE-POST": {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case  "PROFILE/SAVE-PHOTO-SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case  "PROFILE/SAVE-PROFILE-UPDATES": {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const addPost = (newPostText: string) => ({
    type: "PROFILE/ADD-POST",
    newPostText,
} as const)

export const setUserProfile = (profile: ProfileType) => ({
    type: "PROFILE/SET-USER-PROFILE",
    profile,
} as const)

export const setStatus = (status: string) => ({
    type: "PROFILE/SET-STATUS",
    status,
} as const)

export const deletePost = (postId: number) => ({
    type: "PROFILE/DELETE-POST",
    postId,
} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({
    type: "PROFILE/SAVE-PHOTO-SUCCESS",
    photos,
} as const)

export const saveProfileUpdates = (profile: ProfileType) => ({
    type: "PROFILE/SAVE-PROFILE-UPDATES",
    profile,
} as const)

// Thunk
export const getUserProfile = (userId: string): AppThunk => async (dispatch: TypedDispatch) => {
    let response = await usersApi.getProfile(Number(userId))
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: string): AppThunk => async (dispatch: TypedDispatch) => {
    let response = await profileApi.getStatus(Number(userId))
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): AppThunk => async (dispatch: TypedDispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file: File): AppThunk => async (dispatch: TypedDispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): AppThunk => async (dispatch,getState) => {
    const userId = getState().auth.userId;
    const response = await profileApi.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId as unknown as string));
    } else {
        // @ts-ignore
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response?.data.messages[0]);
    }
}

