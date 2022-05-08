import React from 'react';
import s from "./Usrer.module.css";
import defaultUserPhoto from "../../assets/images/User-Avatar-Profile.png";
import {followSuccess, toggleIsFollowingProgress, UserType} from "../../redux/users-reduser";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {usersApi} from "../../api/api";

type UsersPresPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    users: UserType[]
    currentPage: number
    unfollowSuccess: (userId: number) => void
    followSuccess: (userId: number) => void
    followingInProgress: number[]
}


const Users = (props: UsersPresPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
        if (i > 30) break
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span onClick={(e) => {
                        props.onPageChange(p)
                    }}
                    className={props.currentPage === p ? s.selectedPage : ""}>{p}</span>
                })}
            </div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id} >
                                <img className={s.photo}
                                     src={u.photos.small || defaultUserPhoto}  //  || или
                                     alt="User Photo"/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some(id=>id === u.id)}
                                    onClick={() => {props.unfollowSuccess(u.id)}}
                                >Unfollow</button>
                                : <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.followSuccess(u.id)}}
                                >Follow</button>}
                        </div>
                    </span>
                        <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                        <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                    </div>)
            }
        </div>
    );
};

export default Users;
