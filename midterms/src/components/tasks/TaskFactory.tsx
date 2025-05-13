import type { Task, BasicTask, TimedTask, ChecklistTask } from "../../types/taskTypes";
import { FiTrash2, FiBell, FiCalendar, FiCheckCircle } from 'react-icons/fi';

interface TaskFactoryProps {
    type: 'basic' | 'timed' | 'checklist';
    task: Task;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleChecklistItem?: (taskId: string, itemId: string) => void;
}

const TaskCard: React.FC<{ children: React.ReactNode, isCompleted: boolean }> = ({ children, isCompleted }) => (
    <div className={`bg-white flex-1 rounded-xl shadow-sm p-5 border transition-all ${isCompleted ? 'border-green-100 bg-green-50' : 'border-gray-100 hover:shadow-md'
        }`}>
        {children}
    </div>
);


const BasicTaskComponent: React.FC<{ task: BasicTask }> = ({ task }) => {
    return (
        <div className="flex items-start gap-4">
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                }`}>
                {task.title}
            </h3>
            {task.description && (
                <p className="mt-1 text-gray-600">{task.description}</p>
            )}
        </div>
    );
};

interface ChecklistTaskComponentProps {
    task: ChecklistTask;
    onToggleItem?: (taskId: string, itemId: string) => void;
}

const ChecklistTaskComponent: React.FC<ChecklistTaskComponentProps> = ({ task, onToggleItem }) => {
    const completedCount = task.items.filter(item => item.completed).length;
    const progress = (completedCount / task.items.length) * 100;

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                    }`}>
                    {task.title}
                </h3>
                <span className="text-sm font-medium text-blue-600">
                    {progress}%
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <ul className="space-y-2">
                {task.items.map(item => (
                    <li key={item.id} className="flex items-center">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => onToggleItem?.(task.id, item.id)}
                                readOnly
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                        <span className={`ml-3 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'
                            }`}>
                            {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TimedTaskComponent: React.FC<{ task: TimedTask }> = ({ task }) => {
    const isDueSoon = new Date(task.dueDate!) < new Date(Date.now() + 86400000 * 2);
    const isOverdue = new Date(task.dueDate!) < new Date();
    return (
        <div className="space-y-2">
            {task.reminder && (
                <div className={` ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-amber-600' : 'text-gray-600'} flex items-center justify-end gap-1`}>
                    <FiBell className="flex-shrink-0" />
                    <span>{new Date(task.reminder).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )}
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                }`}>
                {task.title}
            </h3>
            <div className="flex items-center gap-2 text-sm">
                <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                    <FiCalendar className="flex-shrink-0" />
                    <span>Due: {new Date(task.dueDate!).toLocaleDateString()}</span>
                </div>
            </div>
            {isOverdue && !task.completed && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    Overdue
                </span>
            )}
        </div>
    );
};

export const TaskFactory = ({
    type,
    task,
    onToggleComplete,
    onDelete,
    onToggleChecklistItem,
}: TaskFactoryProps) => {
    const renderTask = () => {
        switch (type) {
            case 'basic':
                return <BasicTaskComponent task={task as BasicTask} />;
            case 'timed':
                return <TimedTaskComponent task={task as TimedTask} />;
            case 'checklist':
                return (
                    <ChecklistTaskComponent
                        task={task as ChecklistTask}
                        onToggleItem={onToggleChecklistItem}
                    />
                );
            default:
                throw new Error(`Unknown task type: ${type}`);
        }
    };

    return (
        <div className={`group relative flex items-center gap-3 ${task.completed ? 'opacity-90' : ''}`}>
            <button
                onClick={() => onToggleComplete(task.id)}
                className={`p-1.5 rounded-full ${task.completed
                    ? 'text-green-500 bg-green-100'
                    : 'text-gray-400 hover:text-gray-500 bg-gray-100'
                    }`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
                <FiCheckCircle className="text-xl" />
            </button>

            <TaskCard isCompleted={task.completed}>
                <div className="relative">
                    {renderTask()}
                    <button
                        onClick={() => onDelete(task.id)}
                        className="absolute -top-3 -right-3 p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200"
                        aria-label="Delete task"
                    >
                        <FiTrash2 className="text-lg" />
                    </button>
                </div>
            </TaskCard>
        </div>
    );
};