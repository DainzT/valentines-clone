import { useState } from "react";
import { TaskFactory } from "../components/tasks/TaskFactory";
import type { Task } from '../types/taskTypes';
import { taskManager } from "../lib/TaskManager";
import { Title } from "../components/layout/Title";
import { ActionButton } from "../components/ui/ActionButton";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

const ToDoListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            type: 'basic',
            title: 'Buy groceries',
            description: 'Milk, eggs, bread',
            completed: false,
            createdAt: new Date(),
        },
        {
            id: 2,
            type: 'timed',
            title: 'Doctor appointment',
            dueDate: new Date('2023-12-15'),
            reminder: new Date('2023-12-15T09:00:00'),
            completed: false,
            createdAt: new Date('2022-12-15T09:00:00'),
        },
        {
            id: 3,
            type: 'checklist',
            title: 'Project tasks',
            items: [
                { id: 3, text: 'Research', completed: true },
                { id: 4, text: 'Design', completed: false },
            ],
            completed: false,
            createdAt: new Date(),
        },
    ]);

    const handleToggleComplete = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDelete = (id: string) => {
        // taskManager.removeTask(id)
        return
    };

    const handleAddTask = () => {
        // const newTask = taskManager.addTask({
        // type: 'basic',
        // title: 'New Task',
        // completed: false,
        // });
    };

    const handleSave = (task) => {
        console.log('Task saved:', task);
        setIsModalOpen(false);
    };


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
                    onSave={handleSave}
                />
                <div className="space-y-4 w-full ">
                    {tasks.map(task => (
                        <TaskFactory
                            key={task.id}
                            type={task.type}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToDoListPage;