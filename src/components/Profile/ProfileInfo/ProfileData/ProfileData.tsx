import {ContactsType, ProfileType} from "../../../../types/types";
import React from "react";
import Button from "@mui/material/Button";
import {List, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

type ProfileDataPropsType = {
    profile: ProfileType
    isAuth: boolean
    goToEditMode: () => void
}
export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isAuth, goToEditMode}) => {
    return (
        <Paper sx={{
            width: '900px',
            bgcolor: '#91eeb5',
            padding: '20px ',
            display: "flex",
            flexDirection: 'column',
        }}>
            <div>
                <Typography variant='h4'>
                    {profile.fullName}
                </Typography>
                <div>
                    <b>Looking for a job</b> {profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {profile.lookingForAJobDescription}
                    </div>
                }
                <div>
                    <b>About me</b>: {profile.aboutMe}
                </div>
                <List sx={{
                    bgcolor: '#eeb391',
                    padding: '10px ',
                    display: "flex",
                    flexDirection: 'column',
                }}>
                    <Typography variant='body1'>
                        <b>Contacts</b>
                    </Typography> {
                    Object
                        .keys(profile.contacts)
                        .map((key) => {
                            return <Contact key={key} contactTitle={key}
                                            contactValue={profile.contacts[key as keyof ContactsType]}/>
                        })}
                </List>
                {isAuth &&
                    <div>
                        <Button variant="contained" onClick={goToEditMode}>
                            Edit
                        </Button>
                    </div>
                }
            </div>
        </Paper>
    )
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}</b> : {contactValue}
        </div>

    )
}