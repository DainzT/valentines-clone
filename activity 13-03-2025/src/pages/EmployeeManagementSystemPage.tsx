import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm"; 
import { useEffect, useState } from "react";
import { EmployeeDetailProps } from "../types/types";
import axios from "axios";

const EmployeeManagementSystemPage = () => {
    const [employees, setEmployees] = useState<EmployeeDetailProps[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/employees/retrieve");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleFormSubmit = async (employee: EmployeeDetailProps) => {
        try {
            const response = await axios.post("http://localhost:3002/api/employees/add", employee, {
                headers: { "Content-Type": "application/json" }, 
            });
            setEmployees((prev) => [...prev, response.data]); 
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div className="mt-10">
            <EmployeeForm onFormSubmit={handleFormSubmit}/>
            <EmployeeTable employees={employees} setEmployees={setEmployees}/>
        </div>
    );
};

export default EmployeeManagementSystemPage;