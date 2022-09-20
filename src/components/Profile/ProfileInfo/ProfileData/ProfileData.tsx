import {ContactsType, ProfileType} from "../../../../types/types";
import React from "react";
import {Grid, List, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CreateIcon from '@mui/icons-material/Create';

type ProfileDataPropsType = {
    profile: ProfileType
    isAuth: boolean
    goToEditMode: () => void
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isAuth, goToEditMode}) => {

     const contacts =  Object.keys(profile.contacts)
    // const firstPart = contacts.slice(0, Math.ceil(contacts.length / 2))
    // const secondPart = contacts.slice(-Math.floor(contacts.length / 2))

    const mapKeyContact = (key: string) => {
        return <Contact key={key} contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]}
        />
    }

    return (
        <Paper sx={{
            minWidth: '343px',
            minHeight: '420px',
            bgcolor: '#cfe8fc',
            padding: '20px ',
            display: "flex",
            flexDirection: 'column',
        }}>
            <Box>
                {isAuth &&
                    <Grid item container justifyContent= "space-between" direction="row">
                        <Typography variant='h4'>
                            {profile.fullName}
                        </Typography>
                        <Grid item>
                            <IconButton size='small'
                                onClick={goToEditMode}>
                                <CreateIcon/>Edit Profile
                            </IconButton>
                        </Grid>
                    </Grid>
                }
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
                    bgcolor: '#88e6ee',
                    padding: '10px ',
                    display: "flex",
                    flexDirection: 'column',
                }}>
                    <Typography  variant='body1'>
                        <b>My Contacts</b>
                    </Typography>
                        <div>
                            {contacts.map(mapKeyContact)}
                        </div>
                </List>
            </Box>
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
            {contactValue}
        </div>

    )
}