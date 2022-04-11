import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo  = () => {
    return (
        <div >
            <div>
                <img src='https://images.unsplash.com/photo-1541140134513-85a161dc4a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    );
};

export default ProfileInfo;