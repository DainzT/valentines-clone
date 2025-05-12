interface HeaderProps {
    title: string;
    description?: string;
    variant?: 'default' | 'minimal' | 'gradient';
    className?: string;
}

export const Header = ({
    title,
    description,
    variant = 'default',
    className = ''
}: HeaderProps) => {
    const variants = {
        default: 'bg-white shadow-sm',
        minimal: 'bg-transparent',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
    };

    return (
        <header className={`sticky top-0 ${variants[variant]} ${className}`}>
            <div className="container mx-auto px-4 py-4 ">
                <div className="max-w-3xl mx-auto">
                    <h1 className={`text-2xl font-bold ${variant === 'gradient' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {title}
                    </h1>
                    {description && (
                        <p className={`mt-1 ${variant === 'gradient' ? 'text-blue-100' : 'text-gray-600'
                            }`}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
};
