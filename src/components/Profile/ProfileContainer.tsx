import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {addPost, getUserProfile, ProfileType, updateNewPostText} from "../../redux/profile-reduser";
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
            userId = '2'
        }
        this.props.getUserProfile(userId)
    };

    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    };
};

type mapStateToPropsType = {
    profile: null | ProfileType
};

type mapDispatchToPropsType = {
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
    getUserProfile: (userId: string) =>  void
};

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
});

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType >(mapStateToProps,
        {addPost, updateNewPostText, getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)