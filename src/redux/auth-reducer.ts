import {authApi, securityApi} from "../api/api";
import {AppDispatch, TypedDispatch} from "./redux-store";
import {stopSubmit} from "redux-form";

export type InitialAuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
    captchaUrl: string | null
}

export type AuthReducerACType = SetAuthUserDataType | GetCaptchaUrlSuccessType

type SetAuthUserDataType = ReturnType<typeof setAuthUserData>
type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>

let initialState: InitialAuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
}


export const authReducer = (state = initialState, action: AuthReducerACType): InitialAuthStateType => {

    switch (action.type) {
        case "AUTH/SET-AUTH-USER-DATA":
        case "AUTH/GET-CAPTCHA-URL-SUCCESS":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "AUTH/SET-AUTH-USER-DATA",
    payload: {userId, email, login, isAuth}
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: "AUTH/GET-CAPTCHA-URL-SUCCESS",
    payload: {captchaUrl}
} as const)

// Thunk
export const getAuthUserData = () => async (dispatch: TypedDispatch) => {
    let response = await authApi.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: AppDispatch & TypedDispatch) => {
    let response = await authApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        // text from captcha-image that should be added if there is resultCode is 10 in response data.
        if (response.data.resultCode === 10 ) {
            dispatch(getCaptchaUrl())
        }
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

export const getCaptchaUrl = () => async (dispatch: AppDispatch & TypedDispatch) => {
    const response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
