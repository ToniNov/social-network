import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType, StateACType} from "../../redux/state";

type ProfileType = {
    profilePage: ProfilePageType
    addPost:(postText:string) => void
    updateNewPostText:(newText:string)=>void
    dispatch:(action:StateACType) => void
}


const Profile = (props:ProfileType) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts  addPost={props.addPost}
                      updateNewPostText={props.updateNewPostText}
                      dispatch={props.dispatch}
                      posts={props.profilePage.posts}
                      newPostText={props.profilePage.newPostText}
            />
        </div>
    );
};

export default Profile;