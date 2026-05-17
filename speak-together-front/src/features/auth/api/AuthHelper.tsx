import { jwtDecode, type JwtPayload } from "jwt-decode"

type CustomJwtPayload = JwtPayload & {
    Name?: string;
    name?: string;
    unique_name?: string;
    username?: string;
    email?: string;
    role?: string | string[];

    userId?: string;
    id?: string;
    sub?: string;

    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
};

export const getJwt = () => {
    return localStorage.getItem("token");
}

export const getJwtData = () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    return jwtDecode<CustomJwtPayload>(token);
}

export const getUserIdFromJwt = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const data = jwtDecode<CustomJwtPayload>(token);

    return data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? null;
};



