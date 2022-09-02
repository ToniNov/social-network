import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer,} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReduser} from "redux-form";
import {appReducer} from "./app-reducer";
import { sideBarReducer } from "./sideBar-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReduser,
    app: appReducer,
    //sideBar: sideBarReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// thunk type
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>

// DEVTOOLS type
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// @ts-ignore
window.__store__ = store;

// Do this
// собрать типы из всех редюсеров actions
//export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>



