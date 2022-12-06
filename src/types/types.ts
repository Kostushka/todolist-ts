export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};
export type TaskStateType = {
    [todoId: string]: Array<TaskType>;
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
