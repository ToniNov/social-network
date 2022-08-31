import {AppThunkType} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileApi} from "../api/profile-api";

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


export const getUserProfile = (userId: number): AppThunkType => async (dispatch) => {
    const data = await profileApi.getProfile(userId)
    dispatch(setUserProfile(data))
}


export const getStatus = (userId: string): AppThunkType => async (dispatch) => {
    let data = await profileApi.getStatus(Number(userId))
    dispatch(setStatus(data));
};

export const updateStatus = (status: string): AppThunkType => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file: File): AppThunkType => async (dispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
}
// export const saveProfile = (profile: ProfileType): AppThunkType => async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     const response = await profileApi.saveProfile(profile);
//     if (response.resultCode === 0) {
//         dispatch(getUserProfile(userId as unknown as string));
//     } else {
//         // @ts-ignore
//         dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
//         return Promise.reject(response?.messages[0]);
//     }
// }

