import React, {ChangeEvent} from 'react';
import userPhoto from "../../../assets/images/userPhoto.png";
import {ProfileType} from "../../../types/types";
import {useDispatch} from "react-redux";
import {Icon, Paper} from "@mui/material";
import Badge from '@mui/material/Badge';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type PropsType = {
    isAuth: boolean
    savePhoto: (file: File) => void
    profile: ProfileType
}


export const ProfileAvatarContainer: React.FC<PropsType> = ({profile, isAuth, savePhoto}) => {

    const dispatch = useDispatch()

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    }

    return (
        <Paper sx={{
            width: '300px',
            bgcolor: '#cfe8fc',
            padding: '40px ',
            display: "flex",
            flexDirection: 'column',
        }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent= {isAuth &&
                    <IconButton
                        color="default"
                        aria-label="upload avatar"
                        component="label"
                    >
                    <PhotoCamera />
                    <input type={"file"} onChange={onMainPhotoSelected} hidden/>
                    </IconButton>
                }
            >

            <Avatar  src={profile.photos.large || userPhoto}
                     sx={{ width: 250, height: 250 }}
                     alt="Profile Photo"/>
            </Badge>
        </Paper>
    );
};

