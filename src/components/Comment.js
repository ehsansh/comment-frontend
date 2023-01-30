import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './styles/Comment.scss';
import Comments from './Comments';
import useAuth from '../hooks/useAuth';

import AddComment from './AddComment';
import CommentVotes from './CommentVotes';
import CommentBtns from './CommentBtns';
import CommentDeleteWindow from './CommentDeleteWindow';

const moment = require('moment'); // require

const Comment = ({ comment }) => {
    const { User, text, id, updatedAt, votes } = comment;
    const [replyId, setReplyId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const handleReply = id => (replyId === id ? setReplyId(0) : setReplyId(id));

    const handleDelete = async id => {
        try {
            await axiosPrivate.post(
                '/comments/delete',
                JSON.stringify({ id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='Comment'>
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
                                    setDeleteId={setDeleteId}
                                    id={comment.id}
                                />
                            </div>
                            <div className='text'>
                                <p>{text}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {replyId === id && (
                <div className='reply-box'>
                    <AddComment parent_id={id.toString()} btnText={'reply'} />
                </div>
            )}

            <div>
                {comment?.child && (
                    <Comments comments={comment.child} indent={true} />
                )}
            </div>
            {deleteId !== 0 && (
                <CommentDeleteWindow
                    setDeleteId={setDeleteId}
                    handleDelete={handleDelete}
                    id={comment.id}
                />
            )}
        </>
    );
};

export default Comment;
