import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm"; 
import { useState } from "react";
import { EmployeeDetailProps } from "../types/types";

const EmployeeManagementSystemPage = () => {
    const [employees, setEmployees] = useState<EmployeeDetailProps[]>([]);

    const handleFormSubmit = (employee: EmployeeDetailProps) => {
        setEmployees((prevEmployees) => [...prevEmployees, employee])
    };

    return (
        <div >
            <h1> EMS System </h1>
            <EmployeeForm onFormSubmit={handleFormSubmit}/>
            <EmployeeTable employees={employees}/>
        </div>
    );
};

export default EmployeeManagementSystemPage;