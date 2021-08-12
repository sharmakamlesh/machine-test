import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Header } from '../../UI/Header/header';
import style from './register.module.css';
import {BaseURL} from '../../../constant';
import {Loader} from '../../UI/Loader/loader';

export const Register = () => {
    const initialState = {
        firstName: '',
        lastName: "",
        email: "",
        phoneNo: "",
        password: ""
    }
    const [values, setValues] = useState(initialState);
    const [error , setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const inputChangeHandler = (e) => {
        setError(false)
        const {value , name} = e.target;
        setValues({...values, [name]: value})
    }

    const onRegisterHandler = () => {

        const firstName = values.firstName.trim()
        const lastName =   values.lastName.trim()
        const email = values.email.trim()
        const phoneNo =  values.phoneNo.trim()
        const password = values.password.trim()
        //if input field is empty
        if(firstName === '' || lastName === '' || email === '' || phoneNo === '' || password === '') {
            setError(true)
            setErrorMessage('Please Fill all Fields')
            return console.log('Error')
        }
        if(firstName.length <=2 || firstName.length <=2){
            setError(true)
            setErrorMessage('Please enter valid name above 3 characters')
            return console.log('Name')            
        }
        //email is not valid
        if(!email.includes('@')) {
            setError(true)
            setErrorMessage('Invalid Email')
            return console.log('ivalid email')
        }
        //phone no not be greater than 10
        if(phoneNo.length > 10 || phoneNo.length < 10) {
            setError(true)
            setErrorMessage('Phone Number Must be 10 Number')
            return console.log('phone number')
        }

        //password should be greater than 5  
        if(password.length < 6){
            setError(true)
            setErrorMessage('password should be greater than 5')
            console.log('password should be greater than 5')
        }
        setLoading(true)
        //Server Request with Axios
        axios({
            method: 'post',
            url:'/register',
            baseURL : BaseURL,
            data : {
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
                phoneNo: phoneNo
            }
        }).then(res => {
            setLoading(false)
            const success = res.data.success
            if(success === true){
                setSuccess(true)
                setSuccessMessage('Successfully Register !')
                setValues(initialState)
            }
            if(success === false){
                setError(true)
                setErrorMessage(res.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }


    return (
        <>
            {loading && <Loader />}
            <Header />
            <div className={style.registerContainer}>
                <h1 className={style.heading}>Register Here</h1>
                {success && <h1 className={style.success}>{successMessage}</h1>}
                {error && <p className={style.error}>{errorMessage}</p>}
                <input 
                    type="text" 
                    placeholder="First Name*" 
                    name='firstName' 
                    value={values.firstName} 
                    onChange={inputChangeHandler}                   
                />
                <input 
                    type="text" 
                    placeholder="Last Name*" 
                    name='lastName' 
                    value={values.lastName} 
                    onChange={inputChangeHandler}                    
                />
                <input 
                    type="email" 
                    placeholder="Email Address*" 
                    name="email" 
                    value={values.email} 
                    onChange={inputChangeHandler}                    
                />
                <input 
                    type="number" 
                    maxLength={10}
                    placeholder="Phone Number*" 
                    name="phoneNo" 
                    value={values.phoneNo} 
                    onChange={inputChangeHandler}                   
                />
                <input 
                    type="password" 
                    placeholder="Password*" 
                    name="password" 
                    value={values.password} 
                    onChange={inputChangeHandler}
                />
                <button onClick={onRegisterHandler}>Register</button>
                <div className={style.logIn}>
                    <span>Already Registered ?{' '}
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            Log In
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}
