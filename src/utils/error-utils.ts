import {Dispatch} from 'redux';
import {APIResponseType} from "../api/api";
import {actions} from "../redux/app-reducer";

export const handleServerAppError = <T>(data: APIResponseType<T>, dispatch: ErrorUtilsDispatchType) => {

    if (data.messages.length) {
        dispatch(actions.setAppError( data.messages[0]))
    } else {
        dispatch(actions.setAppError('Some error occurred'))
    }
    dispatch(actions.setAppStatus('loading'))
}

export const handleServerNetworkError = (catchError: unknown, dispatch: ErrorUtilsDispatchType) => {
    const error = catchError as Error
    dispatch(actions.setAppError( error.message))
    dispatch(actions.setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof actions.setAppStatus> | ReturnType<typeof actions.setAppError>>
