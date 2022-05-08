import { profileReduser} from "./profile-reduser";
import {dialogsReduser} from "./dialogs-reduser";

type PostType = {
    id: number
    message: string
    likeCounts: string
}

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
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


export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: (postText: string) => void
    _onChange: (_state: RootStateType) => void
    subscribe: (CallbackObserver: () => void) => void
    getState:() => RootStateType
    dispatch:(action:any) => void
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
        newMessageBody: "",
    },
    sidebar: {
        sidebar: []
    }
},
    //
    updateNewPostText(newText:string){
        this._state.profilePage.newPostText = (newText)
        this._onChange(this._state)
    },
    addPost(postText:string){
        const newPost:PostType = {id: 6, message: postText, likeCounts: '0'};
        this._state.profilePage.posts.push(newPost)
        this._onChange(this._state)
    },
    //
    _onChange(_state: RootStateType){
        console.log('State changed')
    },
    subscribe(CallbackObserver){
        this._onChange = CallbackObserver
    },
    getState(){
        return this._state
    },
    dispatch(action: any) {

        // this._state.profilePage = profileReduser(this._state.profilePage, action)
        // this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action)
        //this._state.sidebar = sideBarReduser(this._state.sidebar, action)

        this._onChange(this._state)
    }
}

export default store;