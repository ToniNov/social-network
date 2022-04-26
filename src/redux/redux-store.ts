import {combineReducers, createStore} from "redux";
import {AddPostACType, profileReduser, UpdateNewPostTextACType} from "./profile-reduser";
import {dialogsReduser, sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reduser";
import {FollowACType, SetUsersACType, UnFollowACType, usersReduser} from "./users-reduser";

export type StateACType =
    AddPostACType
    | UpdateNewPostTextACType
    | sendMessageACType
    | updateNewMessageBodyACType
    | FollowACType
    | UnFollowACType
    | SetUsersACType

let rootReducer = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser
    //sideBar: sideBarReduser
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;


