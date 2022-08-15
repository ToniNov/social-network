import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {PhotosType, ProfileType} from "../../../redux/profile-reduser";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from  "../../../assets/images/userPhoto.png";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: any
    savePhoto: (photos: PhotosType ) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e:any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
            </div>
        </div>
    );
};

export default ProfileInfo;