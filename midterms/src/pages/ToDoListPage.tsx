import { useEffect, useState } from "react";
import { TaskFactory } from "../components/tasks/TaskFactory";
import type { Task } from '../types/taskTypes';
import { taskManager } from "../lib/TaskManager";
import { Title } from "../components/layout/Title";
import { ActionButton } from "../components/ui/ActionButton";
import { TaskFormModal } from "../components/tasks/TaskFormModal";
import { TaskSortingStrategy } from "../utils/TaskSortingStrategy";
import { SearchBar } from "../components/ui/SearchBar";
import { SortStrategySelector } from "../components/ui/SortStrategySelector";
import { Notification } from "../components/ui/Notification";

type SortStrategy = "date" | "name" | "id" | "completion";

const ToDoListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortStrategy, setSortStrategy] = useState<SortStrategy>("date");

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

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTasks = (() => {
        switch (sortStrategy) {
            case "date": return TaskSortingStrategy.sortByDate(filteredTasks);
            case "name": return TaskSortingStrategy.sortByName(filteredTasks);
            case "id": return TaskSortingStrategy.sortById(filteredTasks);
            case "completion": return TaskSortingStrategy.sortByCompletion(filteredTasks);
            default: return filteredTasks;
        }
    })();

    return (
        <div className=" bg-gray-50 flex flex-col items-center pt-12 px-4">
            <div className="w-full max-w-3xl space-y-6">
                <Title
                    title="My To-Do List"
                    description="Manage your daily tasks efficiently"
                    size="xl"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />
                        <SortStrategySelector
                            value={sortStrategy}
                            onChange={setSortStrategy}
                        />
                        <ActionButton
                            action="add"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
                <TaskFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddTask}
                />

                <div className="bg-white shadow-md rounded-lg max-h-[calc(100vh-310px)] overflow-y-auto px-4 py-5">
                    {sortedTasks.length === 0 ? (
                        <p className="text-gray-500 text-center">No tasks found.</p>
                    ) : (
                        <div className="space-y-4">
                            {sortedTasks.map(task => {
                                const hasValidDueDate =
                                    "dueDate" in task &&
                                    typeof task.dueDate === "string" &&
                                    !isNaN(new Date(task.dueDate).getTime());

                                const isOverdue =
                                    hasValidDueDate &&
                                    new Date(task.dueDate!) < new Date() &&
                                    !task.completed;

                                return (
                                    <div key={task.id} className="space-y-1">
                                        {isOverdue && (
                                            <Notification>
                                                Your task "<strong>{task.title}</strong>" is overdue!
                                            </Notification>
                                        )}
                                        <TaskFactory
                                            type={task.type}
                                            task={task}
                                            onToggleComplete={handleToggleComplete}
                                            onDelete={handleDeleteTask}
                                            onToggleChecklistItem={handleToggleChecklistItem}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToDoListPage;