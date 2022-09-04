import React from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type UsersPresPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    users: UserType[]
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: number[]
    onFilterChanged:(filter: FilterType ) => void
}


const Users: React.FC<UsersPresPropsType> = ({
                                                 totalUsersCount,
                                                 pageSize,
                                                 onPageChange,
                                                 users,
                                                 currentPage,
                                                 unfollow,
                                                 follow,
                                                 followingInProgress,
                                                 onFilterChanged
                                             }) => {

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
                                         unfollow={unfollow}
                                         follow={follow}
                                         followingInProgress={followingInProgress}
                    />)
                }
            </div>
        </div>
    );
};

export default Users;
