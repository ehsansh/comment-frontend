import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import useAuth from '../hooks/useAuth';
import useComments from '../hooks/useComments';
// import './styles/AddComment.scss';
const AddComment = ({ parent_id, btnText, setReplyId, parent_name }) => {
    let defaultText = btnText === 'reply' ? parent_name : '';
    const [text, setText] = useState(defaultText);
    const axiosPrivate = useAxiosPrivate();
    const [errors, setErrors] = useState([]);
    const { auth } = useAuth();
    const { addComment } = useComments();
    const submit = async () => {
        if (text.length === 0) {
            setErrors([{ msg: 'Please enter your comment.' }]);
            return;
        }
        try {
            const response = await axiosPrivate.post(
                '/comments',
                JSON.stringify({ text, parent_id, user_id: auth?.user?.id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            let newComment = response.data;
            newComment.User = auth.user;
            addComment(newComment);
            setText('');
            if (btnText === 'reply') setReplyId(0);
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className='content-form add-comment'>
            <div>
                <textarea
                    placeholder='Add a comment'
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
