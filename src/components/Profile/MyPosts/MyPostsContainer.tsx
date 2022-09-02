import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppRootStateType>(mapStateToProps,
    {addPost: actions.addPost})
(MyPosts)

export default MyPostsContainer;