export type DialogReduserACType =  sendMessageACType | updateNewMessageBodyACType

type sendMessageACType = ReturnType<typeof sendMessage>
type updateNewMessageBodyACType = ReturnType<typeof updateNewMessageBody>

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type InitialDialogsStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

let initialState :InitialDialogsStateType = {
    dialogs: [
        {id: 1, name: "Anton"},
        {id: 2, name: "Bob"},
        {id: 3, name: "Jon"},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Yooo"},
    ],
    newMessageBody: "",
}

export const dialogsReduser = (state:InitialDialogsStateType = initialState, action:DialogReduserACType):InitialDialogsStateType => {

    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            return {
                ...state,
                newMessageBody:action.body
            }
        case "SAND-MESSAGE":
            let body = state.newMessageBody
            return  {
                ...state,
                newMessageBody : '',
                messages: [...state.messages,{id: 5, message: body}]
            }
        default:
            return state;
    }
}

export const sendMessage = () => {
    return {
        type:"SAND-MESSAGE",
    } as const
}

export const updateNewMessageBody = (body: string) => {
    return {
        type:"UPDATE-NEW-MESSAGE-BODY",
        body:body
    } as const
}