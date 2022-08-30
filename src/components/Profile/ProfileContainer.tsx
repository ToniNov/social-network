import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    addPost,
    getStatus,
    getUserProfile,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type  ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId?: string;
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push("/Login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    };

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto = {this.props.savePhoto}
                     // @ts-ignore
                     saveProfile = {this.props.saveProfile}
            />
        );
    };
}

type MapStateToPropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
};

type MapDispatchToPropsType = {
    addPost: (postText: string) => void
    getUserProfile: (userId: string) =>  void
    getStatus:(userId:string) =>void
    updateStatus:(status:string) => void
    savePhoto: (file: File ) => void
    saveProfile: (profile: ProfileType) => void
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,
        {addPost, getUserProfile,getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)