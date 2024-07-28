
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const goalAPI = {
    fetchGoals: async (queryString) => {
        const url = buildApiUrl('/goals', queryString);
        return await get(url);
    },

    fetchGoal: async (queryString) => {
        const url = buildApiUrl('/goals', queryString);
        return await get(url);
    },

    createGoal: async (data) => {
        const url = buildApiUrl('/goals');
        return await post(url, data);
    },

    updateGoal: async (queryString, data) => {
        const url = buildApiUrl('/goals', queryString);
        return await put(url, data);
    },

    deleteGoal: async (queryString) => {
        const url = buildApiUrl('/goals', queryString);
        return await del(url);
    },

    searchGoals: async (query) => {
        const url = buildApiUrl('/search/goals');
        return await post(url, query);
    },
}
    