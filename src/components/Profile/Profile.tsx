import React, {useEffect} from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect, useParams} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {PATH} from "../../Routes";
import {createTheme} from "@mui/material/styles";


type PropsType ={}

const Profile: React.FC<PropsType> = (props) => {

    const theme = createTheme();

    console.log('profile rend')

    const dispatch = useDispatch()

    const authorizedUserId = useSelector((state: AppRootStateType) => state.auth.userId);
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth);
    const status = useSelector((state: AppRootStateType) => state.profilePage.status);
    const profile = useSelector((state: AppRootStateType) => state.profilePage.profile);

    let {userId} = useParams<{ userId: string }>()

    useEffect(() => {
        if (!userId) {
            userId = authorizedUserId ? authorizedUserId.toString() : '';
        }
        authorizedUserId && dispatch(getUserProfile(Number(userId)))
        dispatch(getStatus(userId))
    }, [userId])


    if (!isAuth) return <Redirect to={PATH.LOGIN}/>

    return (
                <div className={s.content}>
                    <ProfileInfo isAuth={isAuth}
                                 profile={profile}
                                 status={status}
                                 updateStatus={updateStatus}
                                 savePhoto={savePhoto}
                        // @ts-ignore
                                 saveProfile={saveProfile}
                    />
                    <MyPostsContainer/>
                </div>

    );
};

export default Profile;