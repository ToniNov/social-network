import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType, TypedDispatch} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/auth-reduser";
import {toggleIsFetching} from "../../redux/users-reduser";


class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header  logout={this.props.logout} isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
};

type AuthPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null

}

type MapDispatchToPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getAuthUserData: () => void
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {toggleIsFetching, getAuthUserData, logout})(HeaderContainer)
