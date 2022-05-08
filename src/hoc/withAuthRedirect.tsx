import {Component, ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth,...restProps} = props

        if (!props.isAuth) return <Redirect to = {'/login'}/>

        return <Component{...restProps as T}/>
    }

    let ConnectedRedirectedComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectedComponent
}





