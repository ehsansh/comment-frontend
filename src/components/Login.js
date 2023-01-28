import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import axios from '../api/axios';

// import './styles/Login.scss';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuth();

    const submit = async e => {
        e.preventDefault();
        if (email.length === 0) {
            setErrors([{ msg: 'Please enter your email' }]);
            return;
        }
        if (password.length < 8) {
            setErrors([{ msg: 'Please enter your password' }]);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(
                '/user/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            setAuth({ user, accessToken });
            setEmail('');
            setPassword('');
            setIsLoading(false);
            navigate('/');
        } catch (err) {
            setErrors(err.response.data.errors);
            setIsLoading(false);
        }
    };
    return (
        <div>
            <div className='content-form'>
                <form onSubmit={submit}>
                    <div className='row'>
                        <label>Email:</label>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='error'></div>
                    </div>

                    <div className='row'>
                        <label>Password:</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='row'>
                        <button className='save'>
                            <span className='text'>login</span>
                            {isLoading && (
                                <span className='loadingSpinner'></span>
                            )}
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
                {/* <span className='spinner'></span> */}
            </div>
        </div>
    );
}
