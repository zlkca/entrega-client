
    export const selectGoals = (state) => state.goal? state.goal.goals : [];
    export const selectGoal = (state) => state.goal? state.goal.goal : null;
        