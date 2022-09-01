import {maxLengthCreator, required} from "../../../utils/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls";

type PropsType = {}

type DialogsFormValuesType = {
    newMessageBody: string
}
type DialogsFormValuesTypeKeys = GetStringKeys<DialogsFormValuesType>

const maxLength80 = maxLengthCreator(80)

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogsFormValuesTypeKeys>('Enter your message', 'newMessageBody', [required, maxLength80], Textarea)}
            </div>
            <div>
                <button>POST MESSAGE</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<DialogsFormValuesType, PropsType>({form: "dialogAddMessageForm"})(AddMessageForm)