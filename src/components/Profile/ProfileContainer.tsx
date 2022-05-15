import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    addPost,
    getStatus,
    getUserProfile,
    ProfileType,
    updateStatus
} from "../../redux/profile-reduser";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type  ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId?: string;
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authorizedUserId)
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    };

    render() {
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        );
    };
};

type MapStateToPropsType = {
    profile: null | ProfileType
    status: string
    // спросить!!
    authorizedUserId: number | null
    isAuth: boolean
};

type MapDispatchToPropsType = {
    addPost: (postText: string) => void
    getUserProfile: (userId: string) =>  void
    getStatus:(userId:string)=>void
    updateStatus:(status:string)=> void
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,
        {addPost, getUserProfile,getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)