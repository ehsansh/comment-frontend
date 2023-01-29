import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faTrash,
    faPen,
    faReply,
} from '@fortawesome/free-solid-svg-icons';

const CommentBtns = ({ myComment, handleReply, id }) => {
    return (
        <div className='btns'>
            {myComment ? (
                <>
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
                </>
            ) : (
                <div className='reply' onClick={() => handleReply(id)}>
                    <FontAwesomeIcon
                        icon={faReply}
                        size='1x'
                        color='hsl(238, 40%, 52%)'
                    />
                    Reply
                </div>
            )}
        </div>
    );
};

export default CommentBtns;
