import React, {useEffect} from 'react';
import s from './Usrer.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultUserPhoto from '../../assets/images/User-Avatar-Profile.png'

/*
const Users = (props: UsersPropsType) => {

    let getUsers = ()=> {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            });

        }
    }

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.photo}
                                 src={u.photos.small != null
                                     ? u.photos.small
                                     : defaultUserPhoto}
                             alt="User Photo"/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
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

export default Users;*/
