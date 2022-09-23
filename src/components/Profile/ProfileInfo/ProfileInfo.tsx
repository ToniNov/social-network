import React, {useState} from 'react';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/types";
import {useDispatch} from "react-redux";
import {CircularProgress, Grid} from "@mui/material";
import {ProfileAvatarContainer} from "./ProfileAvatarContainer";
import {ProfileData} from "./ProfileData/ProfileData";
import Box from "@mui/material/Box";
import {saveProfile} from "../../../redux/profile-reducer";

type PropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isAuth: boolean
    savePhoto: (file: File ) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isAuth, savePhoto}) => {

    if (!profile) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={1} >
                    <Grid item md={4} >
                            <Grid >
                                <ProfileAvatarContainer isAuth={isAuth} profile={profile} savePhoto={savePhoto}/>
                            </Grid>
                            <Grid sx={{my: 1}}>
                                <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
                            </Grid>
                    </Grid>

                    <Grid item md={8} >
                            <ProfileData profile={profile} isAuth={isAuth}/>
                    </Grid>
                </Grid>
            </Box>
    );
};


export default ProfileInfo;