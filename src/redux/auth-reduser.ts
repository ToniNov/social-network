import {authApi} from "../api/api";
import {AppDispatch, TypedDispatch} from "./redux-store";
import {stopSubmit} from "redux-form";

export type InitialAuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
}

export type AuthReduserACType =
    setAuthUserDataACType

type setAuthUserDataACType = ReturnType<typeof setAuthUserData>

let initialState: InitialAuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
}


export const authReduser = (state: InitialAuthStateType = initialState, action: AuthReduserACType): InitialAuthStateType => {

    switch (action.type) {
        case "AUTH/SET-AUTH-USER-DATA":
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: "AUTH/SET-AUTH-USER-DATA",
        data: {userId, email, login, isAuth}
    } as const
}

export const getAuthUserData = () => async (dispatch: TypedDispatch) => {
    let response = await authApi.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch & TypedDispatch) => {
    let response = await authApi.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = () => async (dispatch: TypedDispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

