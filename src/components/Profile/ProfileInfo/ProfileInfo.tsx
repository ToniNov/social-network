import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";
import {useDispatch} from "react-redux";
import {CircularProgress} from "@mui/material";
import {ProfileAvatarContainer} from "./ProfileAvatarContainer";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isAuth: boolean
    savePhoto: (file: File ) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isAuth, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    if (!profile) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
            .then(() => {
                    setEditMode(false);
                }
            );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                // TODO SIZE 300PX
                <ProfileAvatarContainer isAuth={isAuth} profile={profile} savePhoto={savePhoto}/>

                { editMode
                    ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit = {onSubmit}/>
                    : <ProfileData profile={profile}
                                   isAuth ={isAuth}
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
    isAuth: boolean
    goToEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = ({profile, isAuth,goToEditMode}) => {
  return  <div>
      { isAuth &&<div><button onClick={goToEditMode}>Edit</button></div>}
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