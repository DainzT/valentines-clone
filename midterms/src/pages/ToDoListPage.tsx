import { useEffect, useState } from "react";
import { TaskFactory } from "../components/tasks/TaskFactory";
import type { Task } from '../types/taskTypes';
import { taskManager } from "../lib/TaskManager";
import { Title } from "../components/layout/Title";
import { ActionButton } from "../components/ui/ActionButton";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

const ToDoListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setIsLoading(true);
                const fetchedTasks = await taskManager.fetchTasks();
                setTasks(fetchedTasks)
                console.log(fetchedTasks)
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadTasks();
    }, []);

    const handleDeleteTask = async (id: string) => {
        try {
            await taskManager.removeTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task.');
            console.error(err);
        }
    };

    const handleAddTask = async (task: Omit<Task, 'id'>) => {
        console.log(task)
        try {
            const newTask = await taskManager.addTask(task);
            setTasks(prev => [...prev, newTask]);
            setIsModalOpen(false);
        } catch (err) {
            setError('Failed to add task.');
            console.error(err);
        }
    };

    const handleToggleComplete = async (id: string) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            if (!taskToUpdate) return;

            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
            await taskManager.updateTask(updatedTask);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
        } catch (err) {
            setError('Failed to update task.');
            console.error(err);
        }
    };

    const handleToggleChecklistItem = async (taskId: string, itemId: string) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (!taskToUpdate || taskToUpdate.type !== 'checklist') return;

            const updatedItems = taskToUpdate.items!.map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            );
            const updatedTask = { ...taskToUpdate, items: updatedItems };

            await taskManager.updateTask(updatedTask);
            setTasks(prev => prev.map(task =>
                task.id === taskId ? updatedTask : task
            ));
        } catch (err) {
            setError('Failed to update checklist item.');
            console.error(err);
        }
    };

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-50 flex flex-col items-center justify-start pt-12 px-4">
            <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-8 ">
                    <Title
                        title="My To-Do List"
                        description="Manage your daily tasks efficiently"
                        size="xl"
                    />
                    <ActionButton
                        action="add"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <TaskFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddTask}
                />
                <div className="space-y-4 w-full ">
                    {tasks.map(task => (
                        <TaskFactory
                            key={task.id}
                            type={task.type}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDeleteTask}
                            onToggleChecklistItem={handleToggleChecklistItem}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToDoListPage;