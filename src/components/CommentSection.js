import React from 'react';
import LTT from 'list-to-tree';
import Comments from './Comments';
import AddComment from './AddComment';

const CommentSection = ({ type, type_id }) => {
    let data = null;
    let comments = [];
    if (data) {
        let ltt = new LTT(data, {
            key_id: 'id',
            key_parent: 'parent_id',
        });
        comments = ltt.GetTree();
    }

    return (
        <>
            {comments !== undefined && (
                <Comments comments={comments} indent={0} />
            )}
            <AddComment parent_id='0' />
        </>
    );
};

export default CommentSection;
