import s from "../Dialogs.module.css";
import React from "react";

export type MessageType = {
    message: string
    id: number
}

let newDialogElement = React.createRef<HTMLTextAreaElement>()

let addText = () => {
    alert(newDialogElement.current?.value)
}

export const Message = (props: MessageType) => {
    return (
        <div className={s.message}>
            <div>
                {props.message}
            </div>
            <div>
                <textarea ref={newDialogElement}></textarea>
            </div>
            <div>
                <button onClick={addText}>Send Message</button>
            </div>
        </div>
    )
}