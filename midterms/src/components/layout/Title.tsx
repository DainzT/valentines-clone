interface TitleProps {
    title: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Title = ({
    title,
    description,
    align = 'left',
    size = 'md',
    className = ''
}: TitleProps) => {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    const titleSizeClasses = {
        sm: 'text-xl font-semibold',
        md: 'text-2xl font-bold',
        lg: 'text-3xl font-bold',
        xl: 'text-4xl font-bold'
    };

    const descSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    return (
        <div className={`${alignClasses[align]} ${className}`}>
            <h1 className={`${titleSizeClasses[size]} text-gray-900 dark:text-white mb-2`}>
                {title}
            </h1>
            {description && (
                <p className={`${descSizeClasses[size]} text-gray-600 dark:text-gray-400 max-w-3xl mx-auto`}>
                    {description}
                </p>
            )}
        </div>
    );
};
