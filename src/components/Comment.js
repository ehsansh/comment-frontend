import React, { useState } from 'react';
import Comments from './Comments';
import moment from 'jalali-moment';
import './styles/Comment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AddComment from './AddComment';

const Comment = ({ comment, indent }) => {
    const { name, text, id } = comment;
    const [replyId, setReplyId] = useState(0);

    return (
        <div className={`content comment ${indent ? 'indented' : ''} `}>
            <div>
                <div className='comment-author'>{name}</div>
                {/* <div className='comment-date'></div> */}
                <p className='comment-text'>{text}</p>
                <span className='reply' onClick={() => setReplyId(id)}>
                    reply
                </span>

                {replyId === id && (
                    <div className='reply-box'>
                        <div
                            className='close-btn'
                            onClick={() => setReplyId(0)}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                size='2x'
                                color='#363c50'
                            />
                        </div>
                        <AddComment parent_id={id.toString()} />
                    </div>
                )}
            </div>

            <div>
                {comment?.child && (
                    <Comments comments={comment.child} indent={indent + 1} />
                )}
            </div>
        </div>
    );
};

export default Comment;
