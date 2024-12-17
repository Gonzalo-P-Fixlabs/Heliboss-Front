import axios, { AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { AuthResponse } from '@/app/login/interface/login.interface';
// import {useAuthStore} from "@/app/store/authStore";
import {BACKEND_URL} from "@/app/api/common/app.api";

export default async function Login(
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        // const { setToken } = useAuthStore.getState();

        const response: AxiosResponse<AuthResponse> = await axios.post<AuthResponse>(
            `${BACKEND_URL}/user/authLogin`,
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const token = response.data.access_token;
        // setToken(token);
        setCookie('auth-token', token, {
            // httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            secure: false,
            sameSite: 'strict',
            path: '/',
        });
        return response.data;
    } catch (error) {
        console.log("error");
        throw error;
    }
}