import React from 'react';

import './styles/CommentDeleteWindow.scss';

const CommentDeleteWindow = () => {
    return (
        <div className='CommentDeleteWindow'>
            <div className='content'>
                <h4>Delete comment</h4>
                <p>
                    Are you sure you want to delete this comment? This will
                    remove the comment and can't be undone.
                </p>
                <div className='btns'>
                    <button className='no'>No, cancel</button>
                    <button className='yes'>Yes, delete</button>
                </div>
            </div>
        </div>
    );
};

export default CommentDeleteWindow;
