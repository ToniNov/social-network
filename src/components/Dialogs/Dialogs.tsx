import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reduser";


type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
    updateNewMessageBody: (body:string) => void
    sendMessage:() => void
}
const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)


    const onSendMessageClick = () => {
        props.sendMessage()
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea value={props.newMessageBody}
                                  onChange={onNewMessageChange}
                        placeholder={'Enter your message'}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>POST MESSAGE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;