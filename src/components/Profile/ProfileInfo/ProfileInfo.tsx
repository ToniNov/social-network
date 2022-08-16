import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ContactsType, PhotosType, ProfileType} from "../../../redux/profile-reduser";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from  "../../../assets/images/userPhoto.png";
import ProfileDataForm from "./ProfileDataForm";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File ) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
            .then(() => {setEditMode(false);}
        );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                { editMode
                    ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit = {onSubmit}/>
                    : <ProfileData profile={profile}
                                   isOwner ={isOwner}
                                   goToEditMode={()=>{setEditMode(true)}}
                    />
                }

                <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
            </div>
        </div>
    );
};


type ProfileDataPropsType = {
    profile : ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = ({profile, isOwner,goToEditMode}) => {
  return  <div>
      { isOwner &&<div><button onClick={goToEditMode}>Edit</button></div>}
      <div>
          <b>Full name</b>: {profile.fullName}
      </div>
      <div>
          <b>Looking for  a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob &&
          <div>
              <b>My professional skills</b>: {profile.lookingForAJobDescription}
          </div>
      }
      <div>
          <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
          <b>Contacts</b>: {
          Object
              .keys(profile.contacts)
              .map((key)  => {
                  return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
              })}
      </div>
  </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null
}

const Contact:React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b> : {contactValue}</div>
}


export default ProfileInfo;