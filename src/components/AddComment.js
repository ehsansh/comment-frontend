import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import useAuth from '../hooks/useAuth';

// import './styles/AddComment.scss';
const AddComment = ({ parent_id }) => {
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [errors, setErrors] = useState([]);
    const { auth } = useAuth();

    const submit = async e => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(
                '/comments',
                JSON.stringify({ text, parent_id, user_id: auth?.user?.id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            // console.log(response.data);
            // isMounted && setData(response.data);
        } catch (err) {
            setErrors(err.data.error);
        }
    };

    return (
        <div className='content-form comment-section'>
            <form onSubmit={submit}>
                <div className='row'>
                    <textarea
                        placeholder='Add a comment'
                        cols='45'
                        rows='8'
                        name='text'
                        v-validate="'required'"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    ></textarea>
                </div>
                <div className='row'>
                    <button className='save'>
                        <span className='text'>Send</span>
                        {/* {isLoading && <span className='loadingSpinner'></span>} */}
                    </button>
                </div>
            </form>
            <div className='row'>
                <div className='error-msg error'>
                    {!success && errors.map(e => e.msg)}
                </div>
                {success && <div className='success-msg'></div>}
            </div>
        </div>
    );
};

export default AddComment;
