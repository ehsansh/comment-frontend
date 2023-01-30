import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faReply } from '@fortawesome/free-solid-svg-icons';
const CommentBtns = ({
    myComment,
    handleReply,
    handleEdit,
    setDeleteId,
    id,
}) => {
    return (
        <div className='btns'>
            {myComment ? (
                <>
                    <div onClick={() => setDeleteId(id)} className='delete'>
                        <FontAwesomeIcon
                            icon={faTrash}
                            size='1x'
                            color='hsl(358, 79%, 66%)'
                        />
                        Delete
                    </div>
                    <div onClick={() => handleEdit(id)} className='edit'>
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
