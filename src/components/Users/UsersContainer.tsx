import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, InitialUserStateType, setUsersAC, unfollowAC, UserType} from "../../redux/users-reduser";
import Users from "./UsersC";



type mapStateToPropsType = {
    users: UserType[]
}

type mapDispatchToPropsType = {
    follow: (userId:number)=> void
    unfollow: (userId:number)=> void
    setUsers: (users: Array<UserType>)=> void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state:AppStateType) :mapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch : Dispatch) : mapDispatchToPropsType => {
    return {
        follow: (userId:number)=>{
            dispatch(followAC(userId))
        },
        unfollow: (userId:number)=>{
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>)=>{
            dispatch(setUsersAC(users))
        }
    }
}

const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)

export default UsersContainer;