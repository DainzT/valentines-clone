import { useState, useEffect } from 'react';
import { FiX, FiClock, FiList, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task, ChecklistTask, BaseTask } from '../../types/taskTypes';

type TaskType = 'basic' | 'timed' | 'checklist';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: Task;
  onAdd: (task: Task) => void;
}

export const TaskFormModal = ({
  isOpen,
  onClose,
  initialTask,
  onAdd
}: TaskFormModalProps) => {
  const [taskType, setTaskType] = useState<TaskType>(initialTask?.type || 'basic');
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(
    initialTask?.type === 'timed' ? formatDateForInput(initialTask.dueDate!) : ''
  );
  const [checklistItems, setChecklistItems] = useState<ChecklistTask['items']>(
    initialTask?.type === 'checklist' ? initialTask.items : [{ id: generateId(), text: '', completed: false }]
  );

  function formatDateForInput(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function generateId(): string {
    return Date.now().toString();
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { id: generateId(), text: '', completed: false }]);
  };

  const handleRemoveChecklistItem = (id: string) => {
    if (checklistItems.length > 1) {
      setChecklistItems(checklistItems.filter(item => item.id !== id));
    }
  };

  const handleChecklistChange = (id: string, value: string) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, text: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseTask: Omit<BaseTask, 'type'> = {
      id: initialTask?.id || generateId(),
      title,
      description,
      completed: initialTask?.completed || false,
      createdAt: initialTask?.createdAt || new Date()
    };

    let taskData: Task;
    switch (taskType) {
      case 'timed':
        if (!dueDate) return;
        taskData = {
          ...baseTask,
          type: 'timed',
          dueDate: new Date(dueDate),
          reminder: new Date(dueDate)
        };
        break;
      case 'checklist':
        taskData = {
          ...baseTask,
          type: 'checklist',
          items: checklistItems.filter(item => item.text.trim() !== '')
        };
        break;
      default:
        taskData = {
          ...baseTask,
          type: 'basic'
        };
    }

    onAdd(taskData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl z-10 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {initialTask ? 'Edit Task' : 'Add New Task'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                      {(['basic', 'timed', 'checklist'] as TaskType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            taskType === type
                              ? 'bg-white shadow-sm text-blue-600'
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                          onClick={() => setTaskType(type)}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {type === 'basic' && <FiCheckCircle />}
                            {type === 'timed' && <FiClock />}
                            {type === 'checklist' && <FiList />}
                            <span>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {taskType === 'timed' && (
                    <div className="mb-4 space-y-3">
                      <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date *
                        </label>
                        <div className="relative">
                          <input
                            id="dueDate"
                            type="datetime-local"
                            required
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {taskType === 'checklist' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Checklist Items *
                      </label>
                      <div className="space-y-2">
                        {checklistItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => handleChecklistChange(item.id, e.target.value)}
                              placeholder="Item description"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required={checklistItems.length > 0}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveChecklistItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-500"
                              disabled={checklistItems.length <= 1}
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleAddChecklistItem}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FiPlus className="h-4 w-4" />
                        Add another item
                      </button>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {initialTask ? 'Update Task' : 'Add Task'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};