
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const taskAPI = {
    fetchTasks: async (queryString) => {
        const url = buildApiUrl('/tasks', queryString);
        return await get(url);
    },

    fetchTask: async (queryString) => {
        const url = buildApiUrl('/tasks', queryString);
        return await get(url);
    },

    createTask: async (data) => {
        const url = buildApiUrl('/tasks');
        return await post(url, data);
    },

    updateTask: async (queryString, data) => {
        const url = buildApiUrl('/tasks', queryString);
        return await put(url, data);
    },

    deleteTask: async (queryString) => {
        const url = buildApiUrl('/tasks', queryString);
        return await del(url);
    },

    searchTasks: async (query) => {
        const url = buildApiUrl('/search/tasks');
        return await post(url, query);
    },
}
    