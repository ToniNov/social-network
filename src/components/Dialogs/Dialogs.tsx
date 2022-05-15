import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reduser";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators";


type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    sendMessage: (newMessageBody:string) => void
}
const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    // спросить!!
    let addNewMessage = (values:any) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit = {addNewMessage}/>
            </div>
        </div>
    );
};

type FormDataType = {
    textarea: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm : React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate = {[required,maxLength50]}
                       name="newMessageBody" placeholder="Enter your message"/>
            </div>
            <div>
                <button>POST MESSAGE</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;