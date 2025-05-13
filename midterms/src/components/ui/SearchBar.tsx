import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    placeholder = "Search tasks..."
}) => {
    return (
        <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="w-full sm:w-64 pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
        </div>
    );
};