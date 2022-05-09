import {Dispatch} from "redux";
import {profileApi, usersApi} from "../api/api";
import {TypedDispatch} from "./redux-store";

export type InitialProfileStateType = {
    posts: Array<PostType>
    newPostText: string
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

type PhotosType = {
    small: string
    large: string
}

export type ProfileReduserACType = AddPostACType | UpdateNewPostTextACType
    | setUserProfileType | setStatusType

type AddPostACType = ReturnType<typeof addPost>
type UpdateNewPostTextACType = ReturnType<typeof updateNewPostText>
type setUserProfileType = ReturnType<typeof setUserProfile>
type setStatusType = ReturnType<typeof setStatus>

let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ],
    newPostText: 'Type post',
    profile: null,
    status: ''
}

export const profileReduser = (state = initialState, action: ProfileReduserACType): InitialProfileStateType => {

    switch (action.type) {
        case "ADD-POST":
            let newPost: PostType = {id: 3, message: action.postText, likeCounts: '0'};
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case "UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
            }
        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPost = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText,
    } as const
}
export const updateNewPostText = (newText: string) => ({
    type: "UPDATE-NEW-POST-TEXT",
    newText: newText,
} as const)

export const setUserProfile = (profile: ProfileType) => ({
    type: "SET-USER-PROFILE",
    profile: profile,
} as const)

export const setStatus = (status:string) => ({
    type: "SET-STATUS",
    status: status,
} as const)

// Thynk
export const getUserProfile = (userId: string) => (dispatch: TypedDispatch) => {
    usersApi.getProfile(Number(userId))
        .then(response => {
            dispatch(setUserProfile(response.data));
        });
}
export const getStatus = (userId: string) => (dispatch: TypedDispatch) => {
    profileApi.getStatus(Number(userId))
        .then(response => {
            dispatch(setStatus(response.data));
        });
}
export const updateStatus = (status: string) => (dispatch: TypedDispatch) => {
    profileApi.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}

