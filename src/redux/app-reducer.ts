import {AppThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
    initializedSuccess:() => ({type: "SN/APP/INITIALIZED-SUCCESS"} as const)
}

export const initializeApp = (): AppThunkType => (dispatch) => {
    dispatch(getAuthUserData())

    Promise.all([Promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState

