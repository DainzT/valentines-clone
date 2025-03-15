import { EmployeeDetailProps } from "../types/types";
import DeleteEmployee from "./DeleteEmployee";

interface EmployeeRowProps {
    employee: EmployeeDetailProps;
    onDelete: (employee: EmployeeDetailProps) => void;
}

const EmployeeRow = ({ employee, onDelete }: EmployeeRowProps) => {
    return (
        <tr className="text-center border-gray-300">
            <td className="border border-gray-400 px-4 py-2">{employee.firstName}</td>
            <td className="border border-gray-400 px-4 py-2">{employee.lastName}</td>
            <td className="border border-gray-400 px-4 py-2">{employee.groupName}</td>
            <td className="border border-gray-400 px-4 py-2">{employee.role}</td>
            <td className="border border-gray-400 px-4 py-2">$ {employee.expectedSalary}</td>
            <td className="border border-gray-400 px-4 py-2">{employee.expectedDateOfDefense}</td>
            <td className="border border-gray-400 px-4 py-2">
                <DeleteEmployee employee = {employee} onDelete={onDelete}/>
            </td>
        </tr>
    );
};

export default EmployeeRow;
