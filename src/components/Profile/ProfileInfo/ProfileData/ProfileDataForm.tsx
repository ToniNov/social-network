import React from "react";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../../common/FormsControls/FormsControls.module.css";
import {ContactsType, ProfileType} from "../../../../types/types";
import {GeneralModal} from "../../../common/Modal/GeneralModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";

type ProfileDataFormType = {
    profile: ProfileType
    visible: boolean
    setActive: (state: boolean) => void
}

const ProfileDataFormModal:  React.FC<InjectedFormProps<ProfileType, ProfileDataFormType> & ProfileDataFormType>=
    ({handleSubmit,profile,error,visible,setActive }) => {


    return (

        <GeneralModal visible={visible} setVisible={setActive}>

        <form onSubmit={handleSubmit}>
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
            <ProfileDataContactsForm profile = {profile}/>
            <div>
                <Button variant="outlined" type={'submit'}>Save</Button>
            </div>
        </form>
        </GeneralModal>
    )
}

type ProfileDataContactsFormType = {
    profile: ProfileType
}

export const ProfileDataContactsForm: React.FC<ProfileDataContactsFormType> = ({profile}) => {

    const contacts =  Object.keys(profile.contacts)
    const firstPart = contacts.slice(0, Math.ceil(contacts.length / 2))
    const secondPart = contacts.slice(-Math.floor(contacts.length / 2))

    const mapKeyContact = (key: string) => {
        return <div key={key}>
            {key}: {createField(key, "contacts." + key,[], Input )}
        </div>
    }

    return (
        <div>
        <b>Contacts</b>:
        <div style={{display: 'flex', width: '450px', justifyContent: 'space-between'}}>
            <div>
                {firstPart.map(mapKeyContact)}
            </div>
            <div>
                {secondPart.map(mapKeyContact)}
            </div>
        </div>
    </div>
    );
};


const ProfileDataFormReduxFormModal = reduxForm<ProfileType,ProfileDataFormType>({form: 'edit-profile'})(ProfileDataFormModal)

export default ProfileDataFormReduxFormModal;