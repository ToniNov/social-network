import React from 'react';
import {connect} from "react-redux";
import {AppStateType, StateACType} from "../../redux/redux-store";
import {
    followSuccess, getUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollowSuccess,
    UserType
} from "../../redux/users-reduser";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
    }

    onPageChange = (pageNumber: number) => {
        this.props.getUsers(pageNumber,this.props.pageSize)

    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       onPageChange={this.onPageChange}
                       users={this.props.users}
                       currentPage={this.props.currentPage}
                       unfollowSuccess={this.props.unfollowSuccess}
                       followSuccess={this.props.followSuccess}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}


type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchToPropsType = {
    followSuccess: (userId: number) => void
    unfollowSuccess: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress:(isFetching:boolean, userId: number) => void
    // типизация Thynk
    getUsers: (currentPage: number, pageSize: number)  => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {followSuccess, unfollowSuccess, setCurrentPage,
            toggleIsFollowingProgress, getUsers}),
    withAuthRedirect
)(UsersContainer)