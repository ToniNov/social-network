import {authApi} from "../api/api";
import {Dispatch} from "redux";
import {TypedDispatch} from "./redux-store";

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


export const authReduser = (state: InitialAuthStateType = initialState, action: AuthReduserACType):InitialAuthStateType=> {

    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = ( userId: number | null, email: string | null, login: string | null) => {
    return {
        type: "SET-AUTH-USER-DATA",
        data: {userId, email, login,}
    } as const
}

export const getAuthUserData = () => (dispatch:TypedDispatch)=>{
    //this.props.toggleIsFetching(true); как добавить подгрузку
    authApi.me()
        .then(response => {
            // this.props.toggleIsFetching(false); too
            if (response.data.resultCode === 0 ) {
                let {id,email,login} = response.data.data
                dispatch(setAuthUserData(id,email, login,)) ;
            }
        });
}

