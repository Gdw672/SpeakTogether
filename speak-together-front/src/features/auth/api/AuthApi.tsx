import axios from 'axios';
import type { LoginData } from '../AuthTypes';
import type { RegisterData } from '../AuthTypes';


export const loginRequest = async (data: LoginData) => {
    const response = await axios.post(
        "https://localhost:7173/user/log-in",
        data
    )
    return response.data
}

export const registerRequest = async (data: RegisterData) => {
    const response = await axios.post(
        "https://localhost:7173/user/create",
        data
    )
    return response.data
}