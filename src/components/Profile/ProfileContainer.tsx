import React from 'react';
import Profile from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from '../../types/types';
import {getIsAuth} from "../../redux/users-selectors";

type MapDispatchToPropsType = {
    getUserProfile: (userId: string) =>  void
    getStatus:(userId:string) =>void
    updateStatus:(status:string) => void
    savePhoto: (file: File ) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type PathParamsType = {
    userId: string;
}

type PropsType = RouteComponentProps<PathParamsType> & MapPropsType & MapDispatchToPropsType

// const ProfilePage: React.FC<PropsType> =(props)=> {
//
//     const isAuth = useSelector(getIsAuth)
//     const dispatch = useDispatch()
//
//     return (
//         <Profile {...this.props}
//                  isOwner={!this.props.match.params.userId}
//                  profile={this.props.profile}
//                  status={this.props.status}
//                  updateStatus={this.props.updateStatus}
//                  savePhoto = {this.props.savePhoto}
//                  saveProfile = {this.props.saveProfile}
//         />
//     )
// }


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile(){
        let userId: number | null = + this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(String(userId))
            this.props.getStatus(String(userId))
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    componentWillUnmount(): void {}

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto = {this.props.savePhoto}
                     saveProfile = {this.props.saveProfile}
            />
        )
    }
}


let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);