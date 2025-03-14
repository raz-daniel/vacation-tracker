import axios from "axios";
import Login from "../models/user/Login";
import Register from "../models/user/Register";

class Auth {
    async login(login: Login): Promise<string> {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login)
        return response.data.jwt
    }

    async register(register: Register): Promise<string> {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/register`, register)
        return response.data.jwt
    }
}

const auth = new Auth()
export default auth;