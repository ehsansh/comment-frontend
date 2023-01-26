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

    const {
        register: registerForm,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm();
    const submit = async data => {
        const { name, email, password } = data;
        try {
            const response = await axios.post(
                '/user/register',
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            //console.log(JSON.stringify(response))
            setSuccess(true);
        } catch (err) {
            setErrors(err.data.error);
        }
    };

    const form = (
        <div className='content-form'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='row'>
                    <label>name</label>
                    <input
                        type='text'
                        {...registerForm('name', {
                            required: true,
                        })}
                    />
                    <div className='error'>
                        {formErrors.name && <p>Please enter your name.</p>}
                    </div>
                </div>

                <div className='row'>
                    <label>email</label>
                    <input
                        type='type'
                        {...registerForm('email', {
                            required: true,
                            pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    <div className='error'>
                        {formErrors.email && (
                            <p>Please enter your email address.</p>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <label>Password</label>
                    <input
                        type='password'
                        {...registerForm('password', {
                            required: true,
                            minLength: 8,
                        })}
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
                        {/* {isLoading && <span className='loadingSpinner'></span>} */}
                    </button>
                </div>
            </form>
            <div className='row'>
                <div className='errors'>{errors.map(e => e.msg)}</div>
            </div>
        </div>
    );

    const successMsg = (
        <div className='content-success'>
            دوست عزیز ثبت نام شما با موفقیت انجام شد.
            <br />
            لطفا از طریق صفحه ورود به سایت و با وارد کردن شماره موبایل و رمز
            عبور وارد حساب کاربری خود شوید.
            <div className='link'>
                <Link to='/login'>ورود به سایت</Link>
            </div>
        </div>
    );

    return success ? successMsg : form;
}
