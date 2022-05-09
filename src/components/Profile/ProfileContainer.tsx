import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    addPost,
    getStatus,
    getUserProfile,
    ProfileType,
    updateNewPostText,
    updateStatus
} from "../../redux/profile-reduser";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type  ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType

type PathParamsType = {
    userId?: string;
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '23063'
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

type mapStateToPropsType = {
    profile: null | ProfileType
    //
    status: any
};

type mapDispatchToPropsType = {
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
    getUserProfile: (userId: string) =>  void
    //
    getStatus:(userId:string)=>void
    updateStatus:(status:any)=> void
};

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType >(mapStateToProps,
        {addPost, updateNewPostText, getUserProfile,getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)