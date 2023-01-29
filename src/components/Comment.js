import React, { useState } from 'react';
import './styles/Comment.scss';
import Comments from './Comments';
import useAuth from '../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faTrash,
    faPen,
    faReply,
} from '@fortawesome/free-solid-svg-icons';
import AddComment from './AddComment';
import CommentVotes from './CommentVotes';
const moment = require('moment'); // require

const Comment = ({ comment, indent }) => {
    const { User, text, id, updatedAt, votes } = comment;
    const [replyId, setReplyId] = useState(0);
    const { auth } = useAuth();

    return (
        <div className={`Comment ${indent ? 'indented' : ''} `}>
            <div>
                <div className='content'>
                    <CommentVotes votes={votes} />
                    <section className='comment-details'>
                        <div className='top'>
                            <div className='name-date'>
                                <span className='name'>{User?.name}</span>
                                <span className='date'>
                                    {' '}
                                    {moment(updatedAt).fromNow()}
                                </span>
                            </div>
                            {comment.user_id === auth.user.id ? (
                                <div className='btns'>
                                    <div className='delete'>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size='1x'
                                            color='hsl(358, 79%, 66%)'
                                        />
                                        Delete
                                    </div>
                                    <div className='edit'>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            size='1x'
                                            color='hsl(238, 40%, 52%)'
                                        />
                                        Edit
                                    </div>
                                </div>
                            ) : (
                                <div className='btns'>
                                    <div
                                        className='reply'
                                        onClick={() => setReplyId(id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faReply}
                                            size='1x'
                                            color='hsl(238, 40%, 52%)'
                                        />
                                        Reply
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='text'>
                            <p>{text}</p>
                        </div>
                    </section>
                </div>

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
