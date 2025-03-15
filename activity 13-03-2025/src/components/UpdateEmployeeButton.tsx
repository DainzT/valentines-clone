import { EmployeeDetailProps } from "../types/types";

interface UpdateEmployeeProps {
    employee: EmployeeDetailProps;
    onUpdate: (employee: EmployeeDetailProps) => void;
}


const UpdateEmployeeButton = ({ employee, onUpdate }: UpdateEmployeeProps ) => {
    return (
        <button 
            className="bg-blue-500 text-white rounded-3xl p-1"
            onClick={() => onUpdate(employee)}
        >
            Update
        </button>
    );
};

export default UpdateEmployeeButton;