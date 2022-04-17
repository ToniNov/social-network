import  { DialogType, MessageType,StateACType} from "./store";

export type sendMessageACType = ReturnType<typeof sendMessageAC>
export type updateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>

type dialogsReduserType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

export const dialogsReduser = (state:dialogsReduserType, action:StateACType) => {

    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            state.newMessageBody = (action.body)
            return state;
        case "SAND-MESSAGE":
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 5, message: body})
            return state;
        default:
            return state;
    }
}

export const sendMessageAC = () => {
    return {
        type:"SAND-MESSAGE",
    } as const
}

export const updateNewMessageBodyAC =(body: string) => {
    return {
        type:"UPDATE-NEW-MESSAGE-BODY",
        body:body
    } as const
}