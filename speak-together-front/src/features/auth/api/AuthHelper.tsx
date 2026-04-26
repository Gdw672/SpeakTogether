import { jwtDecode } from "jwt-decode"

export const getJwt = () => {
    return localStorage.getItem("token");
}

export const getJwtData = () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    return jwtDecode(token)
}

