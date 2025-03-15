import { EmployeeDetailProps } from "../types/types";


interface DeleteEmployeeProps {
    employee: EmployeeDetailProps;
    onDelete: (employee: EmployeeDetailProps) => void;
}


const DeleteEmployee = ({ employee, onDelete }: DeleteEmployeeProps) => {
    return (
        <button 
            className="bg-red-500 text-white rounded-3xl p-1"
            onClick={() => onDelete(employee)}
        >
            Delete
        </button>
    );
};

export default DeleteEmployee;