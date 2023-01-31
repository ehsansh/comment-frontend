import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

// import './styles/Register.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
export default function Register() {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register: registerForm,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm();
    const submit = async data => {
        const { name, email, password } = data;
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
            setSuccess(true);
            setIsLoading(false);
        } catch (err) {
            setErrors(err.response.data.errors);
            setIsLoading(false);
        }
    };

    const form = (
        <div className='content-form'>
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
                    />
                    <div className='error'>
                        {formErrors.name && <p>Please enter your name.</p>}
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
                    />
                    <div className='error'>
                        {formErrors.email && (
                            <p>Please enter your email address.</p>
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
                    />
                    <div className='error'>
                        {formErrors.password && (
                            <p>Password should at least be 8 characters</p>
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

    const successMsg = (
        <div className='content-form'>
            <p>
                You have been registered successfully!
                <br />
                Now you can
                <Link to='/login'> log in </Link>
                into your account.
            </p>
        </div>
    );

    return success ? successMsg : form;
}
