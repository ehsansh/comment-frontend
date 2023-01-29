import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import useAuth from '../hooks/useAuth';

// import './styles/AddComment.scss';
const AddComment = ({ parent_id, btnText }) => {
    const [text, setText] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [errors, setErrors] = useState([]);
    const { auth } = useAuth();

    const submit = async () => {
        if (text.length === 0) {
            setErrors([{ msg: 'Please enter your comment.' }]);
            return;
        }
        try {
            await axiosPrivate.post(
                '/comments',
                JSON.stringify({ text, parent_id, user_id: auth?.user?.id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            window.location.reload();
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className='content-form add-comment'>
            <div>
                <textarea
                    placeholder='Add a comment'
                    // cols='45'
                    // rows='8'
                    name='text'
                    v-validate="'required'"
                    value={text}
                    onChange={e => setText(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button className='save' onClick={() => submit()}>
                    <span className='text'>{btnText}</span>
                    {/* {isLoading && <span className='loadingSpinner'></span>} */}
                </button>
            </div>
            {/* <div className='row'>
                <div className='error-msg error'>{errors.map(e => e.msg)}</div>
            </div> */}
        </div>
    );
};

export default AddComment;
