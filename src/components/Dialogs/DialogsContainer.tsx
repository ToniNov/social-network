import React, {ChangeEvent} from 'react';
import {
    DialogType,
    MessageType, sendMessage,
} from "../../redux/dialogs-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type MapDispatchToPropsType = {
    sendMessage:(newMessageBody:string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state:AppStateType) : MapStateToPropsType =>{
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {sendMessage}),
    withAuthRedirect
)(Dialogs);