/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import EmployeeData from "../components/EmployeeData";

interface EmployeeProps {
    name: string
    salary: number
}

interface EmployeeListProps {
    data: Array<EmployeeProps>
}

const EmployeeManagementSystemPage = () => {
    const [Employees, useEmployees] = useState<EmployeeListProps>()

    const fetchEmployees = async () =>{
        try {
            const response =  await fetch("http://localhost:3002/api/ems/employees")
            response.json().then((res)=> 
                res.data
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
                data = {[
                    {
                        name: "Dainz",
                        salary: 40000,
                    },
                    {
                        name: "Floyd Torechilla",
                        salary: 60000,
                    },
                    {
                        name: "Michael Flores",
                        salary: 50000,
                    },
                    {
                        name: "Kaizen Cenat",
                        salary: 100000
                    },
                    {
                        name: "Skibidi Sigma",
                        salary: 1000
                    }   
                ]}
            />
        </>
    );
};

export default EmployeeManagementSystemPage;



