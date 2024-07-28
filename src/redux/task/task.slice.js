
import { createSlice } from '@reduxjs/toolkit'

export const initialTaskState = {
    
    tasks: [],
    task: null,
        
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        
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
    
    setTasks,
    setTask,
        
} = taskSlice.actions;

export default taskSlice.reducer;
    