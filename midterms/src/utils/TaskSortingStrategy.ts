import type { Task } from "../types/taskTypes";

export const TaskSortingStrategy = {
    sortByDate: (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) => {
            const aDate = 'dueDate' in a ? new Date(a.dueDate!).getTime() : Infinity;
            const bDate = 'dueDate' in b ? new Date(b.dueDate!).getTime() : Infinity;
            return bDate - aDate;
        });
    },

    sortByName: (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    },

    sortById: (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) =>
            a.id.localeCompare(b.id)
        );
    },

    sortByCompletion: (tasks: Task[]): Task[] => {
        return [...tasks].sort((a, b) =>
            Number(b.completed) - Number(a.completed)
        );
    }
};