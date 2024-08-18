
import { createSlice } from '@reduxjs/toolkit'

export const initialTaskState = {
    
    tasks: [],
    task: null,
        
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action) => {
            state.loading = false;
            state.tasks = [...state.tasks, action.payload];
        },
        deleteTask: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        },
        getTasks: (state, action) => {
            state.loading = true;
        },
        setTasks: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        setTask: (state, action) => {
            state.loading = false;
            state.task = action.payload;
        },
        
    }
})

export const {
    addTask,
    deleteTask,
    updateTask,
    getTasks,
    setTasks,
    setTask,
} = taskSlice.actions;

export default taskSlice.reducer;
    