import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// import './styles/AddComment.scss';
const AddComment = ({ parent_id }) => {
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState([]);

    const submit = async e => {
        e.preventDefault();
        try {
        } catch (err) {
            setErrors(err.data.error);
        }
    };

    return (
        <div className='content-form comment-section'>
            <p>لطفا نظرتان را بنویسید. نشانی ایمیل شما منتشر نخواهد شد.</p>
            <form onSubmit={submit}>
                <div className='row'>
                    <label>پیام</label>
                    <textarea
                        placeholder='ما عاشق خواندن نظرات شما هستیم.'
                        cols='45'
                        rows='8'
                        data-vv-as='متن پیام'
                        name='text'
                        v-validate="'required'"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    ></textarea>
                </div>

                <div className='rows'>
                    <div className='row1'>
                        <label>نام</label>
                        <input
                            className='name'
                            type='text'
                            data-vv-as='نام'
                            name='name'
                            v-validate="'required'"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div
                            className='error'
                            v-show="errors.has('name')"
                        ></div>
                    </div>
                    <div className='row1'>
                        <label>ایمیل</label>
                        <input
                            type='text'
                            data-vv-as='ایمیل'
                            name='email'
                            v-validate="'required|email'"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div
                            className='error'
                            v-show="errors.has('email')"
                        ></div>
                    </div>
                </div>

                <div className='row'>
                    <button className='save'>
                        <span className='text'>ارسال پیام</span>
                        {/* {isLoading && <span className='loadingSpinner'></span>} */}
                    </button>
                </div>
            </form>
            <div className='row'>
                <div className='error-msg error'>
                    {!success && errors.map(e => e.msg)}
                </div>
                {success && (
                    <div className='success-msg'>
                        پیام شما با موفقیت ارسال شد.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddComment;
