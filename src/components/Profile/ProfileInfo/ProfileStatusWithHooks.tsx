import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input, Paper} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateStatus} from "../../../redux/profile-reducer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled, {css} from "styled-components";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const Status = styled.span<{ viewMode: boolean }>`
  ${({viewMode}) => !viewMode && css`
    -webkit-line-clamp: 1;
  `}
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false)
    let [viewMode, setViewMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const dispatch = useDispatch()

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMod = () => {
        setEditMode(true)
    }

    const deactivateEditMod = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }

    const activateViewMod = () => {
        debugger
        setViewMode(true)
    }

    const deactivateViewMod = () => {
        debugger
        setViewMode(false)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    console.log('of')

    return (
        <Paper sx={{
            bgcolor: '#cfe8fc',
            padding: '20px ',
            display: "flex",
            flexDirection: 'column',
        }}>
            {!editMode &&
                <div>
                    <Status viewMode={viewMode}
                            onDoubleClick={activateEditMod}>{props.status || 'Set status'}</Status>
                </div>
            }
            {editMode &&
                <Box>
                    <Input
                        onChange={onStatusChange}
                        value={status}
                        onBlur={deactivateEditMod}
                        autoFocus={true}
                    />
                </Box>
            }
            <Button
                onClick={activateViewMod}
                onBlur={deactivateViewMod}>View</Button>
        </Paper>
    )
}


export default ProfileStatusWithHooks;