import { useState } from "react";
import { EmployeeDetailProps } from "../types/types";
import UpdateEmployeeButton from "./UpdateEmployeeButton";

interface EditDataEmployeeProps {
    employee: EmployeeDetailProps;
    onUpdate: (updatedEmployee: EmployeeDetailProps) => void;
    onCancel: (isEditing: boolean) => void;
}

const EditDataEmployee = ({ employee, onUpdate, onCancel}: EditDataEmployeeProps) => {
    const [updatedEmployee, setUpdatedEmployee] = useState<EmployeeDetailProps>(employee);

    const handleChange = (field: keyof EmployeeDetailProps, value: string | number) => {
        setUpdatedEmployee((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <tr className="fixed text-center border-gray-300">
            {["firstName", "lastName", "groupName", "role", "expectedSalary", "expectedDateOfDefense"].map((field) => (
                <td key={field} className="border border-gray-400 px-4 py-2">
                    <input
                        type={field === "expectedSalary" ? "number" : field === "expectedDateOfDefense" ? "Date" : "text"}
                        value={field === "expectedDateOfDefense"
                            ? new Date(updatedEmployee.expectedDateOfDefense).toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
                            : updatedEmployee[field as keyof EmployeeDetailProps] || ""}
                        onChange={(e) => {
                            handleChange(field as keyof EmployeeDetailProps, e.target.value)
                            console.log("Updated Employee:", updatedEmployee);
                        }}
                        className="border p-1 w-full text-center"
                    />
                </td>
            ))}
            <td className="border border-gray-400 px-4 py-2">
                <UpdateEmployeeButton employee={employee} onUpdate={() => onUpdate(updatedEmployee)} />
                <button onClick={() => onCancel(false)} className="bg-cyan-300 text-white rounded-3xl p-1">
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditDataEmployee;