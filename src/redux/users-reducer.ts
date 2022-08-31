import {Action, Dispatch} from "redux";
import {AppThunkType, InferActionsTypes} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {usersApi} from "../api/users-api";
import {APIResponseType} from "../api/api";

let initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[],
}

type InitialUserStateType = typeof initialState

export const usersReducer = (state = initialState, action: UserReducerACType): InitialUserStateType => {

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
            return {
                ...state,
                users: action.users
            }
        case "SN/USERS/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SN/USERS/SET-TOTAL-USER-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "SN/USERS/TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SN/USERS/TOGGLE-IS-FOLLOWING-PROGRESS":
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

export type UserReducerACType = InferActionsTypes<typeof actions>

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
    } as const)
}

export const requestUsers = (requestPage: number, pageSize: number): AppThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(requestPage))
    let data = await usersApi.requestUsers(requestPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

type ActionCreator<A extends Action> = (...args: any[]) => A
type FollowUnfollowApiMethod = (userId: number) => Promise<APIResponseType>

const _followUnfollow = async <A extends Action>(
    dispatch: Dispatch,
    userId: number,
    apiMethod: FollowUnfollowApiMethod,
    actionCreator: ActionCreator<A>
) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): AppThunkType => {
    return async (dispatch) => {
        let apiMethod = usersApi.follow.bind(usersApi)
        await _followUnfollow(dispatch, userId, apiMethod, actions.followSuccess)
    }
}

export const unfollow = (userId: number): AppThunkType => {
    return async (dispatch) => {
        let apiMethod = usersApi.unfollow.bind(usersApi)
        await _followUnfollow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}