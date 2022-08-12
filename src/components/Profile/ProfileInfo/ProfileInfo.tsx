import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reduser";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt='User photo'/>
                <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
            </div>
        </div>
    );
};

export default ProfileInfo;