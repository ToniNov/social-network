import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReduser, ProfileReduserACType} from "./profile-reduser";
import {DialogReduserACType, dialogsReduser,} from "./dialogs-reduser";
import {UserReduserACType, usersReduser} from "./users-reduser";
import {authReduser, AuthReduserACType} from "./auth-reduser";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {reducer, reducer as formReduser} from "redux-form";
import {appReduser, AppReduserACType} from "./app-reduser";


export type StateACType =
    UserReduserACType | ProfileReduserACType
    | DialogReduserACType | AuthReduserACType
    | AppReduserACType

let rootReducer = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReduser,
    app: appReduser,
    //sideBar: sideBarReduser
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


