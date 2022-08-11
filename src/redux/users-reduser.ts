import {usersApi} from "../api/api";
import {Dispatch} from "redux";
import {TypedDispatch} from "./redux-store";

export type InitialUserStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UserType = {
    id: number
    photos: { small: string }
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}

export type UserReduserACType =
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
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersReduser = (state: InitialUserStateType = initialState, action: UserReduserACType): InitialUserStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case "SET-USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET-TOTAL-USER-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    :  state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => {
    return {
        type: "FOLLOW",
        userId: userId
    } as const
}

export const unfollowSuccess = (userId: number) => {
    return {
        type: "UNFOLLOW",
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: "SET-USERS",
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: "SET-CURRENT-PAGE",
        currentPage: currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: "SET-TOTAL-USER-COUNT",
        totalUsersCount: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "TOGGLE-IS-FETCHING",
        isFetching: isFetching
    } as const
}
export const toggleIsFollowingProgress = (isFetching: boolean,userId: number ) => {
    return {
        type: "TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching: isFetching,
        userId: userId
    }as const
}



export const requestUsers = (requestPage: number, pageSize:number) => (dispatch:TypedDispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(requestPage))
     usersApi.requestUsers(requestPage,pageSize)
         .then(data => {
             dispatch(toggleIsFetching(false));
             dispatch(setUsers(data.items));
             dispatch(setTotalUsersCount(data.totalCount));
         });
 }

 export const follow = (userId: number) => (dispatch:Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
     usersApi.follow(userId)
         .then(response => {
             if (response.data.resultCode == 0) {
                 dispatch(followSuccess(userId))
             }
             dispatch(toggleIsFollowingProgress(false ,userId))
         })
 }
 export const unfollow = (userId: number) => (dispatch:Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
     usersApi.unfollow(userId)
         .then(response => {
             if (response.data.resultCode == 0) {
                 dispatch(unfollowSuccess(userId))
             }
             dispatch(toggleIsFollowingProgress(false ,userId))
         })
 }