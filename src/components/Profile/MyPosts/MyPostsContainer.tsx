import React from 'react';
import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";


type MapStateToPropsType = {
    posts: Array<PostType>

}
type MapDispatchToPropsType = {
    addPost:(newPostText:string)=>void
}

export type PostsPropsType =  MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state:AppStateType):MapStateToPropsType =>{
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps,
    {addPost})
(MyPosts)

export default MyPostsContainer;