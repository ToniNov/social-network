import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {FormAction} from "redux-form";

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED-SUCCESS"} as const)
}

// TODO ADD TYPE !!!!!!!!!
export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());

    await Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

type ActionsType = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>

