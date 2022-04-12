let renderEntireTree = () => {
    console.log('State was changed')
}

export type PostType = {
    id: number
    message: string
    likeCounts: string
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export  type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type  ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

let state : RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi,how are you?', likeCounts: '5'},
            {id: 2, message: "Yooo", likeCounts: '10'},
            {id: 3, message: "NICE", likeCounts: '40'},
            {id: 4, message: "Smie you", likeCounts: '5'},
        ],
        newPostText: 'Type post'
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Anton"},
            {id: 2, name: "Bob"},
            {id: 3, name: "Jon"},
            {id: 4, name: "Smit"},
            {id: 5, name: "Lev"},
            {id: 6, name: "Yra"},
        ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "Yooo"},
            {id: 3, message: "NICE"},
            {id: 4, message: "Smie you"},
        ],
    },
    sidebar: {
        sidebar: []
    }
}

export const addPost = (postText:string)=>{
    const newPost:PostType = {id: 6, message: postText, likeCounts: '0'};
    state.profilePage.posts.push(newPost)

    renderEntireTree()
}
export const updateNewPostText = (newText:string)=>{
    state.profilePage.newPostText = (newText)

    renderEntireTree()
}

export const subscribe = (observer:any) => {
    renderEntireTree = observer
}

export default state;