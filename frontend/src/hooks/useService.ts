import { useContext } from "react";
import axios, { AxiosInstance } from "axios";
import AuthAware from "../services/auth-aware/AuthAware";
import { AuthContext } from "../components/auth/auth/Auth";

export default function useService<T extends AuthAware>(Service: {new(axiosInstance: AxiosInstance): T}): T {

    const { jwt } = useContext(AuthContext)!
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${jwt}`
        },
    })

    const service = new Service(axiosInstance)
    return service
}