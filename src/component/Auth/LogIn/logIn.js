import { useState } from 'react'
import axios from 'axios';
import {BaseURL} from '../../../constant'
import style from './logIn.module.css';
import { Link, useHistory } from 'react-router-dom';
import {Header} from '../../UI/Header/header';
import {Loader} from '../../UI/Loader/loader'

export const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    let history = useHistory()

    //Email Change Handler
    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
        setError(false)
    }

    //Password Change Handler
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
        setError(false)
    }

    const onLogIn = () => {
        const emailValue = email.trim();
        const passwordValue = password.trim();

        if(emailValue === '' || passwordValue === '') {
            setError(true)
            setErrorMessage('Email & password both are required')
            return console.log('Please Fill')
        }
        if(!emailValue.includes('@')){
            return console.log('email is not valid')
        }
        if(passwordValue.length < 6){
            setError(true)
            setErrorMessage('password length must be atleast 6 or more characters')
            return console.log('password must be of length 6 or more')
        }
        
        setLoading(true)
        axios({
            method: 'post',
            url: '/login',
            baseURL: BaseURL,
            data: {
                email: emailValue,
                password: passwordValue
            }
        }).then(res => {
            setLoading(false)
            const success = res.data.success
            if(success === true){
                history.push('/user')
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.user.id)
            }
            if(success === false){
                setError(true)
                setErrorMessage(res.data.message)
                console.log(res.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            setError(true)
            console.log(err)
        })
    }
    return (
        <>
        {loading && <Loader />}
        <Header/>
        <div className={style.logInContainer}>
            <h1>Log In</h1>
            {error && <p className={style.errorMessage}>{errorMessage}</p>}
            <input type="email" placeholder="Email" value={email} onChange={emailChangeHandler}/>           
            <input type="password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
            <button onClick={onLogIn}>Log In</button> 
            <div className={style.register}>
                <span>New Here ?  <Link to='/register' style={{textDecoration: 'none'}}>Register</Link></span>
            </div>
        </div>
        </>
    )
}
