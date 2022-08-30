import {TypedDispatch} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {InitialAppStateType} from "../types/types";

export type AppReducerACType =
    InitializedSuccessACType

type InitializedSuccessACType = ReturnType<typeof initializedSuccess>

let initialState: InitialAppStateType = {
    initialized: false
}


export const appReducer = (state = initialState, action: AppReducerACType): InitialAppStateType => {
    switch (action.type) {
        case "APP/INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const initializedSuccess = (initialized: boolean) => {
    return {
        type: "APP/INITIALIZED-SUCCESS",
        initialized
    } as const
}

export const initializeApp = (initialized: boolean) => (dispatch: TypedDispatch) => {
    dispatch(getAuthUserData())
    Promise.all([Promise])
        .then(() => {
            dispatch(initializedSuccess(initialized))
        })
}


