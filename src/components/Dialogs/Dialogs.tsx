import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";

const Dialogs = (props:any) => {

    let dialogs = [
        {id: 1, name: "Anton"},
        {id: 2, name: "Bob"},
        {id: 3, name: "Jon"},
        {id: 4, name: "Smit"},
        {id: 5, name: "Lev"},
        {id: 6, name: "Yra"},
    ]

    let messages = [
        {id: 1, message: "Hi"},
        {id: 2, message: "Yooo"},
        {id: 3, message: "NICE"},
        {id: 4, message: "Smie you"},
    ]

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = messages.map(m => <Message message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
};

export default Dialogs;