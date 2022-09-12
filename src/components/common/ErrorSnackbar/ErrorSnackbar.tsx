import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {NullableType} from "../../../types/types";
import {actions} from "../../../redux/app-reducer";
import {AppRootStateType} from "../../../redux/redux-store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, NullableType<string>>(s => s.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(actions.setAppError(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}