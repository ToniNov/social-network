import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import { logout} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchToPropsType = {
    logout: () => void
}

type PropsType = MapPropsType & DispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header logout={this.props.logout}
                    isAuth={this.props.isAuth}
                    login={this.props.login}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {logout})(HeaderContainer)
