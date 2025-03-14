import { useState } from "react";
import { EmployeeDetailProps } from "../types/types";

interface FormProps {
    onFormSubmit: (employee: EmployeeDetailProps) => void;
}

const EmployeeForm = ({
    onFormSubmit
}: FormProps) => {
    const [employee, setEmployee] = useState<EmployeeDetailProps>({ 
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateofDefense: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFormSubmit(employee);
        setEmployee({
            firstName: "",
            lastName: "",
            groupName: "",
            role: "",
            expectedSalary: 0,
            expectedDateofDefense: "",
        });
    };

    return (
        <div className="flex justify-center my-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-[80%]">
                <input
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />  
                <input
                    type="text"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    type="text"
                    name="groupName"
                    value={employee.groupName}
                    onChange={handleChange}
                    placeholder="Group Name"
                />
                <input
                    type="text"
                    name="role"
                    value={employee.role}
                    onChange={handleChange}
                    placeholder="Role"
                />
                <input
                    className="w-[10%]"
                    type="number"
                    min="0"
                    max="10000000"
                    name="expectedSalary"   
                    onChange={handleChange}
                    placeholder="Expected Salary"
                />
                <input
                    type="date"
                    name="expectedDateofDefense"
                    value={employee.expectedDateofDefense}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeForm;