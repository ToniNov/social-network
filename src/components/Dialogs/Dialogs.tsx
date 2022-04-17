import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import store, {
    StoreType,
} from "../../redux/store";
import {Message} from "./Message/Message";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reduser";

type DialogsType = {
    store: StoreType
}

const Dialogs = (props: DialogsType) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)
    let newMessageBody = state.newMessageBody

    const onSendMessageClick = () => {
        store.dispatch(sendMessageAC())
    }

    let onNewMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let body =e.currentTarget.value
        store.dispatch(updateNewMessageBodyAC(body))
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
                        <textarea value={newMessageBody}
                                  onChange={onNewMessageChange}
                        placeholder={'Enter your message'}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>oooo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;