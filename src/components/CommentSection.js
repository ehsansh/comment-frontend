import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CommentSection.scss';
import LTT from 'list-to-tree';
import Comments from './Comments';
import AddComment from './AddComment';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

import useLogout from '../hooks/useLogout';
import CommentDeleteWindow from './CommentDeleteWindow';

const CommentSection = ({ type, type_id }) => {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();
    const navigate = useNavigate();
    let comments = [];

    if (data) {
        let ltt = new LTT(data, {
            key_id: 'id',
            key_parent: 'parent_id',
        });
        comments = ltt.GetTree();
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getComments = async () => {
            try {
                const response = await axiosPrivate.get('/comments', {
                    signal: controller.signal,
                });
                isMounted && setData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getComments();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const signOut = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className='CommentSection'>
            {comments !== undefined && (
                <Comments comments={comments} indent={false} />
            )}
            <AddComment parent_id='0' btnText={'send'} />
            {/* <button onClick={signOut}>sign out</button> */}
            {/* <CommentDeleteWindow /> */}
        </div>
    );
};

export default CommentSection;
