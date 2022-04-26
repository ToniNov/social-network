import {StateACType} from "./redux-store";

export type InitialProfileStateType = {
    posts: Array<PostType>
    newPostText: string
}

export type PostType = {
    id: number
    message: string
    likeCounts: string
}

export type AddPostACType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
        {id: 2, message: "Yooo", likeCounts: '10'},
    ],
    newPostText: 'Type post'
}

export const profileReduser = (state: InitialProfileStateType = initialState, action: StateACType): InitialProfileStateType => {

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
        default:
            return state;
    }
}

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText,
    } as const
}

export const updateNewPostTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText,
    } as const
}