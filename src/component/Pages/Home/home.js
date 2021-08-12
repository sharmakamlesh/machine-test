import React from 'react'
import {Link} from 'react-router-dom';
import style from './home.module.css';
import {Header} from '../../UI/Header/header'

export const Home = () => {
    const linkStyle = {textDecoration: 'none'}
    return (
        <>
            <Header/>
            <div className={style.btnContainer}>
                <Link to='/login'  style={linkStyle}>
                    <button className={style.logInBtn}>Log In</button>
                </Link>
                <Link to='register'  style={linkStyle}>
                    <button className={style.RegisterBtn}>Register</button> 
                </Link>          
            </div>
        </>
    )
}
