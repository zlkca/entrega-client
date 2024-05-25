
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const orderAPI = {
    fetchOrders: async (queryString) => {
        const url = buildApiUrl('/orders', queryString);
        return await get(url);
    },

    fetchOrder: async (queryString) => {
        const url = buildApiUrl('/orders', queryString);
        return await get(url);
    },

    createOrder: async (data) => {
        const url = buildApiUrl('/orders');
        return await post(url, data);
    },

    updateOrder: async (queryString, data) => {
        const url = buildApiUrl('/orders', queryString);
        return await put(url, data);
    },

    deleteOrder: async (queryString) => {
        const url = buildApiUrl('/orders', queryString);
        return await del(url);
    },

    searchOrders: async (query) => {
        const url = buildApiUrl('/search/orders');
        return await post(url, query);
    },
}
    