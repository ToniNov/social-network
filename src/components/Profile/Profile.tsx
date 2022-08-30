import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus:(status:string)=> void
    savePhoto: (file: File ) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    isOwner: boolean
}

const Profile = (props: PropsType) => {

    return (
        <div className={s.content} >
            <ProfileInfo isOwner = {props.isOwner}
                         profile = {props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;