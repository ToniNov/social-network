import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow,
    UserType
} from "../../redux/users-reduser";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props
        requestUsers(currentPage,pageSize)
    }

    onPageChange = (pageNumber: number) => {
        const {requestUsers,pageSize} = this.props
        requestUsers(pageNumber,pageSize)
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
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
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
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress:(isFetching:boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number)  => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount:  getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
        {follow, unfollow, setCurrentPage,toggleIsFollowingProgress,requestUsers}),
    withAuthRedirect
)(UsersContainer)