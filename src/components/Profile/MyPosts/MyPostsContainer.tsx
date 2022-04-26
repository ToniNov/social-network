import React from 'react';
import {addPostAC, PostType, updateNewPostTextAC} from "../../../redux/profile-reduser";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
}

type MapDispatchToPropsType = {
    addPost:(newPostText:string)=>void
    updateNewPostTextCallback:(newText:string)=>void
}

export type PostsPropsType =  MapStateToPropsType & MapDispatchToPropsType


let mapStateToProps = (state:AppStateType):MapStateToPropsType =>{
    return {
        posts: state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>{
    return {
        addPost: (newPostText:string) => {
            dispatch(addPostAC(newPostText))
        },
        updateNewPostTextCallback:(newText:string)=>{
            dispatch(updateNewPostTextAC(newText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer;