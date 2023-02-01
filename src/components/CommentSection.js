import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CommentSection.scss';
import Comments from './Comments';
import AddComment from './AddComment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from '../hooks/useLogout';
import useComments from '../hooks/useComments';

const CommentSection = () => {
    const { createCommentsTree, comments } = useComments();
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getComments = async () => {
            try {
                const response = await axiosPrivate.get('/comments', {
                    signal: controller.signal,
                });
                isMounted && createCommentsTree(response.data);
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
            {comments && <Comments comments={comments} indent={0} />}

            <AddComment parent_id='0' btnText={'send'} />
            <div className='footer'>
                <p>
                    If you want you can sign out by pressing the sign out
                    button.
                </p>
                <button className='save' onClick={signOut}>
                    sign out
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
