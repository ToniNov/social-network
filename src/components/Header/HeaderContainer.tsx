import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { logout} from "../../redux/auth-reducer";
import {toggleIsFetching} from "../../redux/users-reducer";


class HeaderContainer extends React.Component<AuthPropsType> {


    render() {
        return (
            <Header  logout={this.props.logout} isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
}

type AuthPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null

}

type MapDispatchToPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {toggleIsFetching,logout})(HeaderContainer)
