import React, { useState } from 'react';
import Comments from './Comments';
import useAuth from '../hooks/useAuth';
// import './styles/Comment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import AddComment from './AddComment';
const moment = require('moment'); // require

const Comment = ({ comment, indent }) => {
    const { User, text, id, updatedAt, votes } = comment;
    const [replyId, setReplyId] = useState(0);
    const { auth } = useAuth();

    return (
        <div className={`comment ${indent ? 'indented' : ''} `}>
            <div>
                <div className='content'>
                    <div className='votes'>
                        <span className='up-vote'>
                            <FontAwesomeIcon
                                icon={faPlus}
                                size='1x'
                                color='#363c50'
                            />
                        </span>
                        <span className='num'>{votes}</span>
                        <span className='up-vote'>
                            <FontAwesomeIcon
                                icon={faMinus}
                                size='1x'
                                color='#363c50'
                            />
                        </span>
                    </div>
                    <section>
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
                                    <div className='delete'>Delete</div>
                                    <div className='edit'>Edit</div>
                                </div>
                            ) : (
                                <div className='btns'>
                                    <div
                                        className='reply'
                                        onClick={() => setReplyId(id)}
                                    >
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
