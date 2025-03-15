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
        expectedSalary: "",
        expectedDateOfDefense: "",
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
            expectedSalary: "",
            expectedDateOfDefense: "",
        });
    };

    return (
        <div className="flex justify-center my-5">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg  w-full max-w-[80%] ">
                <input
                    className="border border-gray-400 px-4 py-2 w-[11.3%]"
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />  
                <input
                    className="border border-gray-400 px-4 py-2 w-[11%]"
                    type="text"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    className="border border-gray-400 px-4 py-2 w-[13.2%]"
                    type="text"
                    name="groupName"
                    value={employee.groupName}
                    onChange={handleChange}
                    placeholder="Group Name"
                />
                <input

                    className="border border-gray-400 px-4 py-2 w-[10.5%]"
                    type="text"
                    name="role"
                    value={employee.role}
                    onChange={handleChange}
                    placeholder="Role"
                />
                <input
                    className="border border-gray-400 px-4 py-2 w-[16.4%]"
                    type="number"
                    min="0"
                    max="10000000"
                    name="expectedSalary"   
                    value={employee.expectedSalary}
                    onChange={handleChange}
                    placeholder="Expected Salary"
                />
                <input
                    className="border border-gray-400 px-4 py-2 w-[27%]"
                    type="date"
                    name="expectedDateOfDefense"
                    value={employee.expectedDateOfDefense}
                    onChange={handleChange}
                />
                <button 
                    type="submit" 
                    className="border border-gray-400 px-4 py-2 w-[10.6%]">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;