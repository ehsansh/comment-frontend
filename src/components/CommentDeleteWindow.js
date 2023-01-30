import React from 'react';

import './styles/CommentDeleteWindow.scss';

const CommentDeleteWindow = ({ setDeleteId, id, handleDelete }) => {
    return (
        <div className='CommentDeleteWindow'>
            <div className='content'>
                <h4>Delete comment</h4>
                <p>
                    Are you sure you want to delete this comment? This will
                    remove the comment and can't be undone.
                </p>
                <div className='btns'>
                    <button className='no' onClick={() => setDeleteId(0)}>
                        No, cancel
                    </button>
                    <button className='yes' onClick={() => handleDelete(id)}>
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentDeleteWindow;
