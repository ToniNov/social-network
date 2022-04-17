import {PostType, StateACType} from "./store";

type profileReduserType = {
    posts: Array<PostType>
    newPostText: string
}

export type AddPostACType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export const  profileReduser = (state:profileReduserType, action:StateACType) => {

    switch (action.type) {
        case "ADD-POST":
            const newPost: PostType = {id: 6, message: action.postText, likeCounts: '0'};
            state.posts.push(newPost)
            return state;
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = (action.newText)
            return state;
        default:
            return state;
    }
}

export const addPostAC = (postText: string) => {
    return {
        type:"ADD-POST",
        postText: postText,
    } as const
}

export const updateNewPostTextAC =(newText: string) => {
    return {
        type:"UPDATE-NEW-POST-TEXT",
        newText:newText,
    } as const
}