import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reduser";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus:(status:any)=> void
}

const ProfileInfo  = (props:PropsType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div >
            <div>
                {/*<img src='https://images.unsplash.com/photo-1541140134513-85a161dc4a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
                alt={'background picture'}/>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt='User photo'/>
                <ProfileStatusWithHooks updateStatus={props.updateStatus} status = {props.status} />
                {/*<ProfileStatus updateStatus={props.updateStatus} status = {props.status} />*/}
            </div>
        </div>
    );
};

export default ProfileInfo;