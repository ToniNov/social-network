import {Component, ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/redux-store";


type MapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state:AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth,...restProps} = props

        if (!props.isAuth) return <Redirect to = {'/Login'}/>

        return <Component{...restProps as T}/>
    }

    let ConnectedRedirectedComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectedComponent
}





