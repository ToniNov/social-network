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

export type StateACType = AddPostACType | UpdateNewPostTextACType

type AddPostACType = ReturnType<typeof addPostAC>

type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: (postText: string) => void
    _onChange: () => void
    subscribe: (CallbackObserver: () => void) => void
    getState:() => RootStateType
    dispatch:(action:StateACType) => void
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

const store: StoreType = {
    _state : {
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
},
    updateNewPostText(newText:string){
        this._state.profilePage.newPostText = (newText)
        this._onChange()
    },
    addPost(postText:string){
        const newPost:PostType = {id: 6, message: postText, likeCounts: '0'};
        this._state.profilePage.posts.push(newPost)
        this._onChange()
    },
    _onChange(){
        console.log('State changed')
    },
    subscribe(CallbackObserver){
        this._onChange = CallbackObserver
    },
    getState(){
        return this._state
    },
    dispatch(action) {
        if (action.type === "ADD-POST"){
            const newPost:PostType = {id: 6, message: action.postText, likeCounts: '0'};
            this._state.profilePage.posts.push(newPost)
            this._onChange()
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = (action.newText)
            this._onChange()
        }
    }
}

export default store;