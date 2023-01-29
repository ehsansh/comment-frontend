import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
const CommentVotes = ({ votes }) => {
    return (
        <div className='votes'>
            <span className='up-vote vote'>
                <FontAwesomeIcon
                    icon={faPlus}
                    size='1x'
                    color='hsl(239, 57%, 85%)'
                />
            </span>
            <span className='num'>{votes}</span>
            <span className='down-vote vote'>
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
