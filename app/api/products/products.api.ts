import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// const getToken = () => {
//     return localStorage.getItem('token');
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getInventory(params: any) {

    const { itemsPerPage, currentPage, search } = params;

    const queryParams = new URLSearchParams();
    if (currentPage) queryParams.append("currentPage", currentPage.toString());
    if (itemsPerPage) queryParams.append("itemsPerPage", itemsPerPage.toString());
    if (search) queryParams.append("search", search.toString());

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/getInventory?${queryParams.toString()}`
      );

    // const response = await axios.get(`http://localhost:3000/api/inventory/getInventory?limit=${itemsPerPage}&page=${currentPage}`);
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncInventory(user: any) {

    const body = {
        "name": "Sincronizar stock de Bsale",
        "endpoint": `${BACKEND_URL}/inventory/syncInventory`,
        "payload": {},
        "user": user
    }
    const response = await axios.post(`${BACKEND_URL}/job/createJob`, body);
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncMVInventory(user: any) {

    const body = {
        "name": "Actualización de stock",
        "endpoint": `${BACKEND_URL}/inventory/syncMVInventory`,
        "payload": {},
        "user": user
    }
    const response = await axios.post(`${BACKEND_URL}/job/createJob`, body);
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncOneItemMVInventory(sku: string, user: any) {

    const body = {
        "name": `Actualización individual de stock (Producto ${sku})`,
        "endpoint": `${BACKEND_URL}/inventory/syncOneItemMVInventory`,
        "payload": {
            "method": "post",
            "data": {
                "sku": sku
            }
        },
        "user": user
    }

    const response = await axios.post(`${BACKEND_URL}/job/createJob`, body);
    return response.data;

}