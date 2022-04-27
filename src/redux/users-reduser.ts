import {StateACType} from "./redux-store";

export type InitialUserStateType = {
    users: Array<UserType>
}

export type UserType = {
    id: number
    photos: string
    followed: boolean
    name: string
    status:string
    location: {city:string,country: string}
}


export type FollowACType = ReturnType<typeof followAC>
export type UnFollowACType = ReturnType<typeof unfollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>


let initialState: InitialUserStateType = {
    users: [],
}

export const usersReduser = (state:InitialUserStateType = initialState, action: StateACType): InitialUserStateType => {

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
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export const followAC = (userId: number) => {
    return {
        type: "FOLLOW",
        userId: userId
    } as const
}

export const unfollowAC = (userId: number ) => {
    return {
        type: "UNFOLLOW",
        userId: userId
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: "SET-USERS",
        users: users
    } as const
}