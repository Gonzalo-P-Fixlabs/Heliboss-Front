//TODO: Centralizar la configuración de los parametros env
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// import {useAuthStore} from "@/app/store/authStore";
import axios from 'axios';

const getToken = () => {
    // return useAuthStore.getState().token;
};

export const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});