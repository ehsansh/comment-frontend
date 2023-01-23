import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ApiService from '../api/ApiService';

// import './styles/AddComment.scss';
const AddComment = ({ parent_id }) => {
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState('');

    const [errors, setErrors] = useState([]);

    const submit = async e => {
        e.preventDefault();
        try {
            const result = await ApiService.addComment({ text });
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
