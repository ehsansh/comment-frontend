import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const CommentVotes = ({ votes, userId, commentId }) => {
    const axiosPrivate = useAxiosPrivate();

    const handleVote = async vote => {
        try {
            await axiosPrivate.post(
                '/comments/vote',
                JSON.stringify({ commentId, userId, vote }),
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
        <div className='votes'>
            <span onClick={() => handleVote(1)} className='up-vote vote'>
                <FontAwesomeIcon
                    icon={faPlus}
                    size='1x'
                    color='hsl(239, 57%, 85%)'
                />
            </span>
            <span className='num'>{votes}</span>
            <span onClick={() => handleVote(-1)} className='down-vote vote'>
                <FontAwesomeIcon
                    icon={faMinus}
                    size='1x'
                    color='hsl(239, 57%, 85%)'
                />
            </span>
        </div>
    );
};

export default CommentVotes;
