import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// const getToken = () => {
//     return localStorage.getItem('token');
// };

export async function getCheckouts() {
    const response = await axios.get(`${BACKEND_URL}/checkout/getCheckout`, {
        // headers: {
        //     Authorization: `Bearer ${getToken()}`,
        // },
    }
);
    return response.data;
}