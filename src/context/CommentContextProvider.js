import React, { createContext, useState } from 'react';
import LTT from 'list-to-tree';

export const CommentContext = createContext({});

export const CommentContextProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [data, setData] = useState([]);

    const makeTreeStructure = data => {
        let ltt = new LTT(data, {
            key_id: 'id',
            key_parent: 'parent_id',
        });
        return ltt.GetTree();
    };

    const createCommentsTree = data => {
        setData(data);
        const tree = makeTreeStructure(data);
        setComments(tree);
    };

    const deleteComment = id => {
        const newData = data.filter(d => d.id !== id);
        setData(newData);
        const tree = makeTreeStructure(newData);
        setComments(tree);
    };

    const addComment = comment => {
        comment.parent_id = +comment.parent_id;
        comment.user_id = +comment.user_id;
        const arr = [...data, comment];
        setData(arr);
        const tree = makeTreeStructure(arr);
        setComments(tree);
    };

    return (
        <CommentContext.Provider
            value={{
                comments,
                createCommentsTree,
                setComments,
                deleteComment,
                addComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
