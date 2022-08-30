import React from 'react';
import { sendMessage,} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {DialogType, MessageType} from "../../types/types";

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type MapDispatchToPropsType = {
    sendMessage:(newMessageBody:string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state:AppRootStateType) : MapStateToPropsType =>{
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {sendMessage}),
    withAuthRedirect
)(Dialogs);