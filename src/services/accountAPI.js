
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const accountAPI = {
    fetchAccounts: async (queryString) => {
        const url = buildApiUrl('/accounts', queryString);
        return await get(url);
    },

    fetchAccount: async (queryString) => {
        const url = buildApiUrl('/accounts', queryString);
        return await get(url);
    },

    createAccount: async (data) => {
        const url = buildApiUrl('/accounts');
        return await post(url, data);
    },

    updateAccount: async (queryString, data) => {
        const url = buildApiUrl('/accounts', queryString);
        return await put(url, data);
    },

    deleteAccount: async (queryString) => {
        const url = buildApiUrl('/accounts', queryString);
        return await del(url);
    },

    searchAccounts: async (query) => {
        const url = buildApiUrl('/search/accounts');
        return await post(url, query);
    },
}
    