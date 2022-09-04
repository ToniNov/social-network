import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {usersApi} from "../api/users-api";
import {APIResponseType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: true}
                )
            }
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    "id",
                    {followed: false})
            }
        case "SN/USERS/SET-USERS":
            return {...state, users: action.users}
        case "SN/USERS/SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SN/USERS/SET-TOTAL-USER-COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "SN/USERS/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SN/USERS/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        case "SN/USERS/SET_FILTER":
            debugger
            return {...state, filter: action.payload}
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: "SN/USERS/FOLLOW", userId} as const),
    unfollowSuccess: (userId: number) => ({type: "SN/USERS/UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SN/USERS/SET-USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SN/USERS/SET-CURRENT-PAGE", currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: "SN/USERS/SET-TOTAL-USER-COUNT",
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "SN/USERS/TOGGLE-IS-FETCHING", isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "SN/USERS/TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching, userId
    } as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
}

export const requestUsers = (requestPage: number,pageSize: number,filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(requestPage))
    dispatch(actions.setFilter(filter))
    debugger
    let data = await usersApi.requestUsers(requestPage, pageSize , filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), actions.unfollowSuccess)
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>