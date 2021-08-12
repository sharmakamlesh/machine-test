import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{ BaseURL} from '../../../constant';
import {Header} from '../../UI/Header/header';
import {Loader} from '../../UI/Loader/loader'
import style from './profile.module.css';

export const Profile = (props) => {
    const [userData, setUserData] = useState([]);
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
                setUserData([res.data.data])
            }            
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    },[])



    return (
        <>
            {loading && <Loader/>}
            <Header>
                <div className={style.logOut}>
                    <button onClick={props.onLogOut}>Log Out</button>
                </div>
            </Header>
            <div className={style.userDetails}>
                {console.log(userData)}
                {userData.length !== 0 && userData.map((data, index) => {
                    return(
                        <div className={style.userDetailsContainer} key={index}>
                            <h1>{data.firstname} {data.lastname}</h1>
                            <span>{data.email}</span>
                            <span>{data.phoneNo}</span>
                            <div className={style.home}>
                                <Link to='/user' style={{textDecoration: 'none'}}><button>Back To Home</button></Link>
                            </div>
                        </div>)
                })}

            </div>
        </>
    )
}
