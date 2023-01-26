import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/user/refresh', {
            withCredentials: true,
        });
        setAuth(prev => {
            // console.log('in refresh token', JSON.stringify(prev));
            // console.log(response.data.accessToken);
            return {
                user: response.data.user,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
