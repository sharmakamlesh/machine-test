import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Header} from '../UI/Header/header';
import {BaseURL} from '../../constant';
import style from './user.module.css';
import {Loader} from '../UI/Loader/loader';
import {Link} from 'react-router-dom';

export const User = (props) => {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const id = localStorage.getItem('id')
        axios({
            method: 'post',
            url: `/fetchAdminById/${id}`,
            baseURL: BaseURL,
        }).then(res => {
            setLoading(false)
            const success = res.data.success
            if(success === true){
                setUserName(res.data.data.firstname)
            }
            
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    },[])


    return (
        <>
            {loading && <Loader />}
            <Header>
                <div className={style.logOut} onClick={props.onLogOut}>
                    <button>Log Out</button>
                </div>
            </Header>
            <div className={style.userDetails}>
                
                    {userName !== '' 
                        &&  
                        <div className={style.viewProfileContainer}>
                            <h1>Hello, {userName}</h1>
                            <Link to='/user/profile' style={{textDecoration: 'none'}}><button>View Profile</button></Link>
                        </div>}                
            </div>
        </>
    )
}
