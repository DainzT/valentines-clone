/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import EmployeeData from "../components/EmployeeData";

interface EmployeeProps {
    name: string
    salary: number
}

interface EmployeeListProps {
    data: EmployeeProps[]
}

const EmployeeManagementSystemPage = () => {
    const [Employees, useEmployees] = useState<EmployeeListProps>()

    const fetchEmployees = async () =>{
        try {
            const response =  await fetch("http://localhost:3002/api/ems/employees")
            response.json().then((res)=> 
                useEmployees(res.data)
            ) 
        } catch (error) {
            console.error("Error submitting survey:", error);
        }
    }

    useEffect( () => {
        fetchEmployees();
    }, [])

    return (
        <>
            <h1>Employee Management System</h1>
            <EmployeeData 
                data = {Employees}
            />
        </>
    );
};

export default EmployeeManagementSystemPage;



