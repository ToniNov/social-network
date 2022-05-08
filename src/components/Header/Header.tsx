import React from 'react';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';

type PropsType = {
    isAuth:boolean
    login: null |string
}

const Header = (props:PropsType) => {
    return (
        <header className = {s.header}>
            <img src='https://st4.depositphotos.com/35426512/40197/v/600/depositphotos_401977630-stock-illustration-group-of-people-team-icon.jpg'/>
           <div className={s.loginBlock}>
               {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> }
           </div>
        </header>
    );
};

export default Header;