import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileApi} from "../api/profile-api";
import {FormAction, stopSubmit} from "redux-form";

let initialState= {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: 'Yo', likeCounts: '10'},
    ] as PostType[],
    profile:  null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
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
        case "SN/PROFILE/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SN/PROFILE/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case  "SN/PROFILE/DELETE-POST": {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case  "SN/PROFILE/SAVE-PHOTO-SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET-USER-PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET-STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE-POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE-PHOTO-SUCCESS', photos} as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    let data = await profileApi.getStatus(Number(userId))
    dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {

    const userId = getState().auth.userId;
    const data = await profileApi.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

