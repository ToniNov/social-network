import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer, ProfileReducerACType} from "./profile-reducer";
import {DialogReducerACType, dialogsReducer,} from "./dialogs-reducer";
import {UserReducerACType, usersReducer} from "./users-reducer";
import {authReducer, AuthReducerACType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {reducer as formReduser} from "redux-form";
import {appReducer, AppReducerACType} from "./app-reducer";

export type AppActionType =
    UserReducerACType | ProfileReducerACType
    | DialogReducerACType | AuthReducerACType
    | AppReducerACType

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReduser,
    app: appReducer,
    //sideBar: sideBarReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
window.__store__ = store;


