type SortStrategy = "date" | "name" | "id" | "completion";

interface SortStrategySelectorProps {
    value: SortStrategy;
    onChange: (value: SortStrategy) => void;
}

export const SortStrategySelector: React.FC<SortStrategySelectorProps> = ({ value, onChange }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortStrategy)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            <option value="date">Sort by Due Date</option>
            <option value="name">Sort by Name</option>
            <option value="id">Sort by ID</option>
            <option value="completion">Sort by Completion</option>
        </select>
    );
};
