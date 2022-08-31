import {ResultCodeCaptchaEnum, ResultCodesEnum} from "../api/api";
import {AppDispatch, AppThunkType, TypedDispatch} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

export type AuthReducerACType = SetAuthUserDataType | GetCaptchaUrlSuccessType

type SetAuthUserDataType = ReturnType<typeof setAuthUserData>
type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null
}

type InitialAuthStateType = typeof initialState

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
export const getAuthUserData = (): AppThunkType => async (dispatch) => {
    let meData = await authApi.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunkType =>
    async (dispatch: AppDispatch & TypedDispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired ) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = (): AppThunkType => async (dispatch) => {
    let data = await authApi.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): AppThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

