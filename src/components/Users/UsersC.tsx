import React from 'react';
import s from './Usrer.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultUserPhoto from '../../assets/images/User-Avatar-Profile.png'

class Users extends React.Component  {

    getUsers = ()=> {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            });

        }
    }

    render() {
        return (
            <div>
                <button onClick={this.getUsers}>Get Users</button>
                {
                    this.props.users.map(u => <div key={u.id}>
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
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
    }
}

export default Users;