import React from 'react';
import Comment from './Comment';

const Comments = ({ indent, comments }) => {
    return (
        <div className={`Comments ${indent ? 'indented' : ''} `}>
            {comments.map(c => (
                <Comment key={c.id} comment={c} indent={indent} />
            ))}
        </div>
    );
};

export default Comments;
