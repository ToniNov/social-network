import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {PhotosType, ProfileType} from "../../redux/profile-reduser";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus:(status:any)=> void
    savePhoto:(photos:PhotosType)=> void
    isOwner: any
}

const Profile = (props: PropsType) => {

    return (
        <div className={s.content} >
            <ProfileInfo isOwner = {props.isOwner}
                         profile = {props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;