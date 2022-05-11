import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReduser, ProfileReduserACType} from "./profile-reduser";
import {DialogReduserACType, dialogsReduser,} from "./dialogs-reduser";
import {UserReduserACType, usersReduser} from "./users-reduser";
import {authReduser, AuthReduserACType} from "./auth-reduser";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {reducer as formReduser} from "redux-form";


export type StateACType =
    UserReduserACType | ProfileReduserACType
    | DialogReduserACType | AuthReduserACType

let rootReducer = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReduser
    //sideBar: sideBarReduser
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = StateACType
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>()


// @ts-ignore
window.store = store;


