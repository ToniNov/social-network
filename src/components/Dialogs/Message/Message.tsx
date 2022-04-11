import s from "../Dialogs.module.css";
import React from "react";

export type MessageType = {
    message: string
    id: number
}

export const Message = (props: MessageType) => {
    return (<div className={s.message}>
            {props.message}
        </div>
    )
}