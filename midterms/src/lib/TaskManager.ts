import type { Task } from "../types/taskTypes";
import { apiClient } from "./apiClient";

export const taskManager = {
    async fetchTasks(): Promise<Task[]> {
        const response = await apiClient.get('/tasks');
        console.log(response.data)
        return response.data;
    },

    async addTask(task: Omit<Task, 'id'>): Promise<Task> {
        const response = await apiClient.post('/tasks', task);
        return response.data;
    },

    async updateTask(task: Task): Promise<Task> {
        const response = await apiClient.put(`/tasks/${task.id}`, task);
        return response.data;
    },

    async removeTask(id: string): Promise<void> {
        await apiClient.delete(`/tasks/${id}`);
    },
};

// findTaskById(id: string): Task | undefined {
//     return this.tasks.find(t => t.id === id);
// }