import React from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../common/FormsControls/FormsControls.module.css";


type ProfileDataFormType = {
    profile: ProfileType
}

const ProfileDataForm:  React.FC<InjectedFormProps<ProfileType, ProfileDataFormType> & ProfileDataFormType>=({handleSubmit ,profile, error}) => {
    return  <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField("Full Name" , "fullName",[], Input )}
        </div>
        <div>
            <b>Looking for  a job</b>:{createField("" , "lookingForAJob",[], Input,{type: "checkbox"})}
        </div>
            <div>
                <b>My professional skills</b>:{createField("My professional skills","lookingForAJobDescription",[], Textarea)}
            </div>
        <div>
            <b>About me</b>:{ createField("About me", "aboutMe", [], Textarea  )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map( key =>{
            return  <div  key={key}>
                <b>{key}: {createField(key, "contacts." + key,[], Input )}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType,ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;