import React, {useState} from 'react';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/types";
import {useDispatch} from "react-redux";
import {CircularProgress, Grid} from "@mui/material";
import {ProfileAvatarContainer} from "./ProfileAvatarContainer";
import {ProfileData} from "./ProfileData/ProfileData";
import Box from "@mui/material/Box";

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
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={1} >
                    <Grid item xs={4}>
                        <Grid >
                            <ProfileAvatarContainer isAuth={isAuth} profile={profile} savePhoto={savePhoto}/>
                        </Grid>
                        <Grid sx={{my: 1}}>
                            <ProfileStatusWithHooks updateStatus={updateStatus} status={status}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        {editMode
                            ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit}/>
                            : <ProfileData profile={profile}
                                           isAuth={isAuth}
                                           goToEditMode={() => {
                                               setEditMode(true)
                                           }}
                            />
                        }
                    </Grid>
                </Grid>
            </Box>
    );
};


export default ProfileInfo;