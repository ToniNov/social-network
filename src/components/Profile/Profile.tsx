import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reduser";

type PropsType = {
    profile: null | ProfileType
}

const Profile = (props: PropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;