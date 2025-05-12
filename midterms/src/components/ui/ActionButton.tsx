import { FiPlus, FiTrash2, FiEdit3, FiSave, FiX } from 'react-icons/fi';

type ButtonAction = 'add' | 'delete' | 'edit' | 'save' | 'cancel';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ActionButtonProps {
    action: ButtonAction;
    onClick: () => void;
    label?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
    className?: string;
    disabled?: boolean;
}

export const ActionButton = ({
    action,
    onClick,
    label,
    size = 'md',
    variant = 'primary',
    className = '',
    disabled = false,
}: ActionButtonProps) => {
    const sizeClasses = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-3 px-6 text-lg',
    };

    const variantClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
    };

    const actionConfig = {
        add: {
            icon: <FiPlus />,
            defaultLabel: 'Add',
            defaultVariant: 'primary' as ButtonVariant,
        },
        delete: {
            icon: <FiTrash2 />,
            defaultLabel: 'Delete',
            defaultVariant: 'danger' as ButtonVariant,
        },
        edit: {
            icon: <FiEdit3 />,
            defaultLabel: 'Edit',
            defaultVariant: 'secondary' as ButtonVariant,
        },
        save: {
            icon: <FiSave />,
            defaultLabel: 'Save',
            defaultVariant: 'primary' as ButtonVariant,
        },
        cancel: {
            icon: <FiX />,
            defaultLabel: 'Cancel',
            defaultVariant: 'ghost' as ButtonVariant,
        },
    };

    const { icon, defaultLabel } = actionConfig[action];
    const effectiveVariant = variant || actionConfig[action].defaultVariant;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        flex items-center gap-2 rounded-lg transition-all
        ${sizeClasses[size]}
        ${variantClasses[effectiveVariant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'shadow-sm hover:shadow-md'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${className}
    `}
            aria-label={label || defaultLabel}
        >
            {icon}
            {label || defaultLabel}
        </button>
    );
};
