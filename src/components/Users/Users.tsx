import React, {useEffect} from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow,} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }


    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator portionSize={pageSize}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onPageChange={onPageChange}
                       currentPage={currentPage}
            />

            <div>
                {
                    users.map(u => <User key={u.id}
                                         user={u}
                                         unfollow={unfollowUser}
                                         follow={followUser}
                                         followingInProgress={followingInProgress}
                    />)
                }
            </div>
        </div>
    );
};

