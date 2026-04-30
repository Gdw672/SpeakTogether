import { jwtDecode, type JwtPayload } from "jwt-decode"

type CustomJwtPayload = JwtPayload & {
    Name?: string;
    name?: string;
    unique_name?: string;
    username?: string;
    email?: string;
    role?: string | string[];
};

export const getJwt = () => {
    return localStorage.getItem("token");
}

export const getJwtData = () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    return jwtDecode<CustomJwtPayload>(token);
}



