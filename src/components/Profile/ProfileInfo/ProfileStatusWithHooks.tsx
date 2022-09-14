import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateStatus} from "../../../redux/profile-reducer";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const dispatch = useDispatch()

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

     const activateEditMod = () => {
         setEditMode(true)
     }

     const deactivateEditMod = () => {
         setEditMode(false)
         dispatch(updateStatus(status))
     }

     const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
         setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>:
                    <span onDoubleClick={activateEditMod}>{props.status || 'Set status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <Input
                        onChange={onStatusChange}
                        value={status}
                        onBlur={deactivateEditMod}
                        autoFocus={true}
                    />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;