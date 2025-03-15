import { useState } from "react";
import { EmployeeDetailProps } from "../types/types";
import DeleteEmployee from "./DeleteEmployee";
import EditDataEmployee from "./EditDataEmployee";

interface EmployeeRowProps {
    employee: EmployeeDetailProps;
    onDelete: (employee: EmployeeDetailProps) => void;
    onUpdate: (employee: EmployeeDetailProps) => void;
}

const EmployeeRow = ({ employee, onDelete, onUpdate }: EmployeeRowProps) => {
        const [editable, setEditable] = useState<boolean>(false);
        if (editable === true) {
            return (
                <EditDataEmployee employee= {employee} onCancel={() => setEditable((prev) => !prev)} onUpdate={onUpdate}/>
            )
        } else {
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
                        <button onClick={() => setEditable((prev) => !prev)} className="bg-green-500 text-white rounded-3xl p-1">Edit</button>
                    </td>
                </tr>
            );
        }
};

export default EmployeeRow;
