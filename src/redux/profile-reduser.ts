import {profileApi, usersApi} from "../api/api";
import {TypedDispatch} from "./redux-store";

export type InitialProfileStateType = {
    posts: Array<PostType>
    profile: null | ProfileType
    status: string
}

export type PostType = {
    id: number
    message: string
    likeCounts: string
}

export type ProfileType = {
    photos: PhotosType
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
}
type  ContactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export type PhotosType = {
    small: string
    large: string
}

export type ProfileReducerACType = AddPostACType | SetUserProfileType
    | SetStatusType | DeletePostType |SavePhotoSuccess

type AddPostACType = ReturnType<typeof addPost>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type DeletePostType = ReturnType<typeof deletePost>
type SavePhotoSuccess = ReturnType<typeof savePhotoSuccess>


let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ],
    profile: null ,
    status: ''
}

export const profileReduser = (state = initialState, action: ProfileReducerACType): InitialProfileStateType => {

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
            // @ts-ignore
             return {...state, profile: {...state.profile, photos: action.photos }}
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
export const savePhotoSuccess = (photos: PhotosType ) => ({
    type: "PROFILE/SAVE-PHOTO-SUCCESS",
    photos,
} as const)

// Thunk
export const getUserProfile = (userId: string) => async (dispatch: TypedDispatch) => {
    let response = await usersApi.getProfile(Number(userId))
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: string) => async (dispatch: TypedDispatch) => {
    let response = await profileApi.getStatus(Number(userId))
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: TypedDispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file: any) => async (dispatch: TypedDispatch) => {
    debugger
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

