import {usersApi} from "../api/api";
import {Action, Dispatch} from "redux";
import {TypedDispatch} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {AxiosResponse} from "axios";
import {InitialUserStateType, UserType} from "../types/types";

export type UserReducerACType =
    FollowACType | UnFollowACType |
    SetUsersACType | SetCurrentPageACType |
    SetTotalUsersCountACType | ToggleIsFetchingACType |
    ToggleIsFollowingProgressACType

type FollowACType = ReturnType<typeof followSuccess>
type UnFollowACType = ReturnType<typeof unfollowSuccess>
type SetUsersACType = ReturnType<typeof setUsers>
type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
type ToggleIsFollowingProgressACType = ReturnType<typeof toggleIsFollowingProgress>


let initialState: InitialUserStateType = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []  as number[],
}

export const usersReducer = (state: InitialUserStateType = initialState, action: UserReducerACType): InitialUserStateType => {

    switch (action.type) {
        case "USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: true}
                )
            }
        case "USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: false})
            }
        case "USERS/SET-USERS":
            return {
                ...state,
                users: action.users
            }
        case "USERS/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "USERS/SET-TOTAL-USER-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "USERS/TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "USERS/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => {
    return {
        type: "USERS/FOLLOW",
        userId: userId
    } as const
}

export const unfollowSuccess = (userId: number) => {
    return {
        type: "USERS/UNFOLLOW",
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: "USERS/SET-USERS",
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: "USERS/SET-CURRENT-PAGE",
        currentPage: currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: "USERS/SET-TOTAL-USER-COUNT",
        totalUsersCount: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "USERS/TOGGLE-IS-FETCHING",
        isFetching: isFetching
    } as const
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: "USERS/TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching: isFetching,
        userId: userId
    } as const
}


export const requestUsers = (requestPage: number, pageSize: number) => async (dispatch: TypedDispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(requestPage))
    let data = await usersApi.requestUsers(requestPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

type ActionCreator<A extends  Action> = (...args: any[]) => A
type FollowUnfollowApiMethod = (userId: number) => Promise<AxiosResponse<any, any>>

const followUnfollow = async <A extends Action>(
    dispatch: Dispatch,
    userId: number,
    apiMethod: FollowUnfollowApiMethod,
    actionCreator:ActionCreator<A>
) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        let apiMethod = usersApi.follow.bind(usersApi)
        followUnfollow(dispatch, userId, apiMethod, followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        let apiMethod = usersApi.unfollow.bind(usersApi)
        await followUnfollow(dispatch, userId, apiMethod, unfollowSuccess)
    }
}