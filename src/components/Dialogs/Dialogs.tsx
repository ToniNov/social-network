import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../types/types";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    sendMessage: (newMessageBody:string) => void
}

const Dialogs = (props: PropsType) => {

    let dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

    let addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit = {addNewMessage}/>
        </div>
    );
};



export default Dialogs;