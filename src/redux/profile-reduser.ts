import {Dispatch} from "redux";
import {usersApi} from "../api/api";
import {TypedDispatch} from "./redux-store";

export type InitialProfileStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileType
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

export type ProfileReduserACType = AddPostACType | UpdateNewPostTextACType | setUserProfileType

type AddPostACType = ReturnType<typeof addPost>
type UpdateNewPostTextACType = ReturnType<typeof updateNewPostText>
type setUserProfileType = ReturnType<typeof setUserProfile>


let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: "Yooo", likeCounts: '10'},
    ],
    newPostText: 'Type post',
    profile: null
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

export const getUserProfile =(userId:string)=>(dispatch:TypedDispatch)=> {
   return usersApi.getProfile(Number(userId))
        .then(response => {
            dispatch(setUserProfile(response.data)) ;
        });
}