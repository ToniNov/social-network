import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer, ProfileReducerACType} from "./profile-reducer";
import {DialogReduserACType, dialogsReducer,} from "./dialogs-reducer";
import {UserReduserACType, usersReducer} from "./users-reducer";
import {authReducer, AuthReducerACType} from "./auth-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {reducer as formReduser} from "redux-form";
import {appReducer, AppReducerACType} from "./app-reducer";


export type StateACType =
    UserReduserACType | ProfileReducerACType
    | DialogReduserACType | AuthReducerACType
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

export type AppStateType = ReturnType<typeof rootReducer>


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = StateACType
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>()

// @ts-ignore
window.__store__ = store;


