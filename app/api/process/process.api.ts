import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getProcess(params: any) {
    const { itemsPerPage, currentPage, search } = params;

    const queryParams = new URLSearchParams();
    if (currentPage) queryParams.append("currentPage", currentPage.toString());
    if (itemsPerPage) queryParams.append("itemsPerPage", itemsPerPage.toString());
    if (search) queryParams.append("search", search.toString());

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job/getJob?${queryParams.toString()}`
      );

    // const response = await axios.get(`http://localhost:3000/api/inventory/getInventory?limit=${itemsPerPage}&page=${currentPage}`);
    return response.data;
}