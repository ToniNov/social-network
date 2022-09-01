import {DialogType, MessageType} from "../types/types";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    dialogs: [
        {id: 1, name: "Anton"},
        {id: 2, name: "Bob"},
        {id: 3, name: "Jon"},
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Yo"},
    ] as MessageType[],
}

export const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/DIALOGS/SEND-MESSAGE":
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: "SN/DIALOGS/SEND-MESSAGE", newMessageBody} as const)
}

type ActionsType = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState