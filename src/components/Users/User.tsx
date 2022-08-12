import React from 'react';
import s from "./Usrer.module.css";
import defaultUserPhoto from "../../assets/images/User-Avatar-Profile.png";
import {UserType} from "../../redux/users-reduser";
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<UserPropsType> = ({user, unfollow, follow, followingInProgress}) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                                <img className={s.photo}
                                     src={user.photos.small || defaultUserPhoto}
                                     alt="User Photo"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>
                            Unfollow
                        </button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>
                            Follow
                        </button>}
                </div>
            </span>
            <span>
                  <div>{user.name}</div>
                  <div>{user.status}</div>
            </span>
            <span>
                  <div>{'user.location.country'}</div>
                  <div>{'user.location.city'}</div>
           </span>
        </div>
    )
};
