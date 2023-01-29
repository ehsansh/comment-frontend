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
import CommentBtns from './CommentBtns';
const moment = require('moment'); // require

const Comment = ({ comment, indent }) => {
    const { User, text, id, updatedAt, votes } = comment;
    const [replyId, setReplyId] = useState(0);
    const { auth } = useAuth();

    const handleReply = id => (replyId === id ? setReplyId(0) : setReplyId(id));

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
                                    {moment(updatedAt).fromNow()}
                                </span>
                            </div>
                            <CommentBtns
                                myComment={comment.user_id === auth.user.id}
                                handleReply={handleReply}
                                id={comment.id}
                            />
                        </div>
                        <div className='text'>
                            <p>{text}</p>
                        </div>
                    </section>
                </div>

                {replyId === id && (
                    <div className='reply-box'>
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
