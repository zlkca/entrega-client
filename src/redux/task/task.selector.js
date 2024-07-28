
    export const selectTasks = (state) => state.task? state.task.tasks : [];
    export const selectTask = (state) => state.task? state.task.task : null;
        