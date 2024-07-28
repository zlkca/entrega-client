
import { createSlice } from '@reduxjs/toolkit'

export const initialGoalState = {
    
    goals: [],
    goal: null,
        
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState: initialGoalState,
    reducers: {
        
        setGoals: (state, action) => {
            state.loading = false;
            state.goals = action.payload;
        },
        setGoal: (state, action) => {
            state.loading = false;
            state.goal = action.payload;
        },
        
    }
})

export const {
    
    setGoals,
    setGoal,
        
} = goalSlice.actions;

export default goalSlice.reducer;
    