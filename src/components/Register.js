import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import { useForm } from 'react-hook-form';
export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuth();
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm();
    const submit = async data => {
        const { name, email, password } = data;
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await axios.post(
                '/user/register',
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            setAuth({ user, accessToken });
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            setErrors(err.response.data.errors);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Register';
    }, []);

    return (
        <div className='auth-form'>
            <div className='row'>
                <h1>Register</h1>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className='row'>
                    <input
                        type='text'
                        {...registerForm('name', {
                            required: true,
                        })}
                        autoComplete='off'
                        placeholder='Name'
                        onFocus={() => setErrors([])}
                        autoFocus
                    />
                    <div className='error'>
                        {formErrors.name && <>Please enter your name.</>}
                    </div>
                </div>

                <div className='row'>
                    <input
                        type='type'
                        {...registerForm('email', {
                            required: true,
                            pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        autoComplete='off'
                        placeholder='Email'
                        onFocus={() => setErrors([])}
                    />
                    <div className='error'>
                        {formErrors.email && (
                            <>Please enter your email address.</>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <input
                        type='password'
                        {...registerForm('password', {
                            required: true,
                            minLength: 8,
                        })}
                        placeholder='Password'
                        onFocus={() => setErrors([])}
                    />
                    <div className='error'>
                        {formErrors.password && (
                            <>Password should at least be 8 characters</>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <button className='save'>
                        <span className='text'>Register</span>
                        {isLoading && <span className='loadingSpinner'></span>}
                    </button>
                </div>
            </form>

            <div className='row'>
                <div className='errors'>
                    {errors.map((e, i) => (
                        <div key={i}>{e.msg}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
