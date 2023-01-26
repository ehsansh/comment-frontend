import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
    const logOut = async () => {
        setAuth({});
        try {
            await axios('user/logout', {
                withCredentials: true,
            });
        } catch (err) {}
    };
    return logOut;
};

export default useLogout;
