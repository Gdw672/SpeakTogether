import axios from 'axios';

export const loginRequest = async (data: LoginData) => {
    const response = await axios.post('https://api.vash-site.com/auth/login', data);
    return response.data;
};