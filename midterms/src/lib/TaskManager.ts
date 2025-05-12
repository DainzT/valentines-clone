import { Task, BasicTask, TimedTask, ChecklistTask } from "../types/taskTypes";

class TaskManager {
    private static instance: TaskManager;
    private tasks: Task[] = [];

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    public addTask(task: Omit<Task, 'id'>): Task {
        const newTask: Task = {
            ...task,
            createdAt: new Date()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    public removeTask(id: number): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        const removed = initialLength !== this.tasks.length;
        return removed;
    }

    public searchTasks(query: string): Task[] {
        const lowerQuery = query.toLowerCase();
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(lowerQuery) ||
            (task.description && task.description.toLowerCase().includes(lowerQuery))
        );
    }
}

export const taskManager = TaskManager.getInstance();