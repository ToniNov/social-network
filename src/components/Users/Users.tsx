import React from 'react';
import {UserType} from "../../redux/users-reduser";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPresPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    users: UserType[]
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: number[]
}


const Users: React.FC<UsersPresPropsType> = ({
                                                 totalUsersCount,
                                                 pageSize,
                                                 onPageChange,
                                                 users,
                                                 currentPage,
                                                 unfollow,
                                                 follow,
                                                 followingInProgress
                                             }) => {

    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount}
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
