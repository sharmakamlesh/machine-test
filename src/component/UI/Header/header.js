import React from 'react'
import style from './header.module.css';
import { logoImg } from '../../../constant';

export const Header = (props) => {
    return (
        <header className={style.header}>
            <nav>
                <div className={style.logo}>
                    <img src={logoImg} alt="logo" />
                    <h1>Machine Test</h1>
                </div>
                {props.children}
            </nav>
            
        </header>
    )
}
