import React, {useEffect} from 'react';
import s from './Usrer.module.css'
import {UsersPropsType} from "./UsersContainer";


const Users = (props:UsersPropsType) => {

    useEffect(()=> {
        if (props.users.length === 0){
            props.setUsers([
                    {
                        id: 1,
                        photoUrl: 'https://thumbs.dreamstime.com/z/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602735.jpg',
                        followed: false,
                        fullName: 'Anton Nov',
                        status: 'I am fine',
                        location: {city: 'Minsk', country: 'Belarus'}
                    },
                    {
                        id: 2,
                        photoUrl: 'https://thumbs.dreamstime.com/z/african-american-man-male-avatar-icon-flat-style-male-user-icon-cartoon-vector-stock-91462825.jpg',
                        followed: false,
                        fullName: 'Bob Li',
                        status: 'I am fine',
                        location: {city: 'Minsk', country: 'Belarus'}
                    },
                    {
                        id: 3,
                        photoUrl: 'https://thumbs.dreamstime.com/z/old-man-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602443.jpg',
                        followed: true,
                        fullName: 'Jon Jonce',
                        status: 'I am fine',
                        location: {city: 'Minsk', country: 'Belarus'}
                    },
                ]
            )
        }
    },[])


    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.photo} src={u.photoUrl}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={()=>{props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={()=>{props.follow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </div>)
            }
            
        </div>
    );
};

export default Users;