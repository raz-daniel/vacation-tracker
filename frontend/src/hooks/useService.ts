import { useContext } from "react";
import axios, { AxiosInstance } from "axios";
import AuthAware from "../services/auth-aware/AuthAware";
import { AuthContext } from "../components/auth/auth/Auth";
import { SocketContext } from "../components/io/Io";

export default function useService<T extends AuthAware>(Service: {new(axiosInstance: AxiosInstance): T}): T {

    const { jwt } = useContext(AuthContext)!
    const { xClientId } = useContext(SocketContext)
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${jwt}`,
            'x-client-id': xClientId
        },
    })

    const service = new Service(axiosInstance)
    return service
}