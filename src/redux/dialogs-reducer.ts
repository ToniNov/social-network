import {DialogType, MessageType} from "../types/types";

export type DialogReducerACType =  sendMessageACType

type sendMessageACType = ReturnType<typeof sendMessage>

let initialState= {
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

type InitialDialogsStateType = typeof initialState

export const dialogsReducer = (state:InitialDialogsStateType = initialState, action:DialogReducerACType):InitialDialogsStateType => {

    switch (action.type) {
        case "SEND-MESSAGE":
            let body = action.newMessageBody
            return  {
                ...state,
                messages: [...state.messages,{id: 5, message: body}]
            }
        default:
            return state
    }
}

export const sendMessage = (newMessageBody: string) => {
    return {
        type:"SEND-MESSAGE",
        newMessageBody: newMessageBody
    } as const
}
