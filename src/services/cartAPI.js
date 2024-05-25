
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const cartAPI = {
    fetchCarts: async (queryString) => {
        const url = buildApiUrl('/carts', queryString);
        return await get(url);
    },

    fetchCart: async (queryString) => {
        const url = buildApiUrl('/carts', queryString);
        return await get(url);
    },

    createCart: async (data) => {
        const url = buildApiUrl('/carts');
        return await post(url, data);
    },

    updateCart: async (queryString, data) => {
        const url = buildApiUrl('/carts', queryString);
        return await put(url, data);
    },

    deleteCart: async (queryString) => {
        const url = buildApiUrl('/carts', queryString);
        return await del(url);
    },

    searchCarts: async (query) => {
        const url = buildApiUrl('/search/carts');
        return await post(url, query);
    },
}
    