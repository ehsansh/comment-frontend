import React from 'react';

import Comment from './Comment';
const Comments = ({ comments, indent }) => {
    return (
        <div className='Comments'>
            {comments.map(c => (
                <Comment key={c.id} comment={c} indent={indent} />
            ))}
        </div>
    );
};

export default Comments;
