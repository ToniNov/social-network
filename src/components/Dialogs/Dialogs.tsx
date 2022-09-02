import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)

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
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
};


export default Dialogs;