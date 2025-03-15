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
            const response = await axios.post("http://localhost:3002/api/employees/add", employee)
            setEmployees((prev) => [...prev, response.data]); 
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const handleDelete = async (employeeToDelete: EmployeeDetailProps) => {
        console.log(employeeToDelete)
        try {
            await axios.delete(`http://localhost:3002/api/employees/delete/${employeeToDelete.id}`);
            setEmployees(employees.filter(employee => employee.id !== employeeToDelete.id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleUpdate = async (employeeToUpdate: EmployeeDetailProps) => {
        try {
            console.log(employeeToUpdate)
            await axios.put(
                `http://localhost:3002/api/employees/update/${employeeToUpdate.id}`
            );    
            console.log("Updated Employee:", employeeToUpdate);
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id === employeeToUpdate.id ? employeeToUpdate : employee
                )
            );
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    return (
        <div className="mt-10">
            <EmployeeForm onFormSubmit={handleFormSubmit}/>
            <EmployeeTable employees={employees} onDelete={handleDelete} onUpdate={handleUpdate}/>
        </div>
    );
};

export default EmployeeManagementSystemPage;