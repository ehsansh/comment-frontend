import React, { useEffect, useState } from 'react';
import LTT from 'list-to-tree';
import Comments from './Comments';
import AddComment from './AddComment';

import ApiService from '../api/ApiService';

const CommentSection = ({ type, type_id }) => {
    const [data, setData] = useState([]);

    let comments = [];

    // var data = [
    //     {
    //         id: 1,
    //         parent_id: 0,
    //         name: 'John',
    //         text: 'Hello, how are you?',
    //     },
    //     {
    //         id: 2,
    //         parent_id: 1,
    //         name: 'Susam',
    //         text: 'This is fine',
    //     },
    //     {
    //         id: 3,
    //         parent_id: 1,
    //         name: 'Albert',
    //         text: 'Nice Comment',
    //     },
    //     {
    //         id: 4,
    //         parent_id: 2,
    //         name: 'Helen',
    //         text: 'Nice reply',
    //     },
    //     {
    //         id: 5,
    //         parent_id: 2,
    //         name: 'Judi',
    //         text: 'Who knows?',
    //     },
    //     {
    //         id: 6,
    //         parent_id: 0,
    //         name: 'Selena',
    //         text: 'This is really interesting',
    //     },
    //     {
    //         id: 7,
    //         parent_id: 0,
    //         name: 'Mailsel',
    //         text: 'Nice act',
    //     },
    //     {
    //         id: 9,
    //         parent_id: 2,
    //         name: 'Arnold',
    //         text: 'Very strong',
    //     },
    // ];

    if (data) {
        let ltt = new LTT(data, {
            key_id: 'id',
            key_parent: 'parent_id',
        });
        comments = ltt.GetTree();
    }

    // try {
    //     const response = ApiService.comments();
    //     console.log(response);
    // } catch (error) {}

    // fetch('http://localhost:3500/api/comments')
    //     .then(response => response.json())
    //     .then(data => console.log(data));

    useEffect(() => {
        const fetchData = async () => {
            const response = await ApiService.comments();
            setData(response.data);
        };
        fetchData().catch(console.error);
    }, []);

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
