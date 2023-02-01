import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './styles/Comment.scss';
import Comments from './Comments';
import useAuth from '../hooks/useAuth';
import useComments from '../hooks/useComments';
import AddComment from './AddComment';
import CommentVotes from './CommentVotes';
import CommentBtns from './CommentBtns';
import CommentDeleteWindow from './CommentDeleteWindow';

const moment = require('moment'); // require

const Comment = ({ comment, indent }) => {
    const { User, text, id, updatedAt, votes } = comment;
    const [replyId, setReplyId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const [editId, setEditId] = useState(0);
    // &#x27; is html equivalent for apostrophe that's why we replace it.
    const [commentText, setCommentText] = useState(
        text.replaceAll('&#x27;', "'")
    );
    const { deleteComment } = useComments();

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const handleReply = id => (replyId === id ? setReplyId(0) : setReplyId(id));
    const handleEdit = id => (editId === id ? setEditId(0) : setEditId(id));

    let replyName = '';
    if (indent > 0) {
        let matches = commentText.match(/@\w+/g);
        if (matches) replyName = matches[0];
    }

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
            deleteComment(id);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axiosPrivate.post(
                '/comments/update',
                JSON.stringify({ id: editId, text: commentText }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setEditId(0);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='Comment'>
                <div>
                    <div className='content'>
                        <CommentVotes
                            votes={+votes}
                            userId={auth.user.id}
                            commentId={comment.id}
                        />
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
                                    handleEdit={handleEdit}
                                    setDeleteId={setDeleteId}
                                    id={comment.id}
                                />
                            </div>
                            <div className='text'>
                                {editId === 0 ? (
                                    <p>
                                        {replyName ? (
                                            <>
                                                <span className='replyName'>
                                                    {replyName}
                                                </span>
                                                <>
                                                    {commentText.replace(
                                                        replyName,
                                                        ''
                                                    )}
                                                </>
                                            </>
                                        ) : (
                                            <>{commentText}</>
                                        )}
                                    </p>
                                ) : (
                                    <>
                                        <textarea
                                            defaultValue={commentText}
                                            onChange={e =>
                                                setCommentText(e.target.value)
                                            }
                                        ></textarea>
                                        <button onClick={handleUpdate}>
                                            update
                                        </button>
                                    </>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {replyId === id && (
                <div className='reply-box'>
                    <AddComment
                        parent_id={id.toString()}
                        parent_name={`@${User?.name.replaceAll(' ', '-')}`}
                        btnText={'reply'}
                        setReplyId={setReplyId}
                    />
                </div>
            )}

            <div>
                {comment?.child && (
                    <Comments comments={comment.child} indent={indent + 1} />
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
