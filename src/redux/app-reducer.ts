import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {FormAction} from "redux-form";
import {NullableType, RequestStatusType} from "../types/types";
import {authApi} from "../api/auth-api";
import {ResultCodesEnum} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED-SUCCESS":
            return {
                ...state,
                isInitialized: true,
            }
        case "SN/APP/SET-STATUS":
            return {...state, status: action.status}
        case "SN/APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

export const actions = {
    setAppInitialized: (value: boolean) => ({type: "SN/APP/INITIALIZED-SUCCESS", value} as const),
    setAppError:(error: string | null) => ({type: "SN/APP/SET-ERROR", error} as const),
    setAppStatus:(status: RequestStatusType) => ({type: "SN/APP/SET-STATUS", status} as const)
}

export const initializeApp = ():  ThunkType => async dispatch => {
    dispatch(actions.setAppStatus('loading'))
    const data = await authApi.me()
    try {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAppInitialized(false))
            dispatch(getAuthUserData())
            dispatch(actions.setAppStatus('succeeded'))
        } else handleServerAppError(data, dispatch)
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(actions.setAppInitialized( true))
        dispatch(actions.setAppStatus( 'succeeded'))
    }
}

type ActionsType = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>

