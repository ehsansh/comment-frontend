import { useContext } from 'react';
import { CommentContext } from '../context/CommentContextProvider';

const useComments = () => {
    return useContext(CommentContext);
};
export default useComments;
