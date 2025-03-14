import { EmployeeDetailProps  } from "../types/types";
import EmployeeRow from "./EmployeeRow";

interface EmployeeTableProps {
    employees: EmployeeDetailProps[];
}

const EmployeeTable = ({
    employees
}: EmployeeTableProps ) => {

    return (
        <div className="flex justify-center">
           <table className="min-w-[80%] border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Group Name
                        </th>
                        <th>
                            Role
                        </th>
                        <th>
                            Expected Salary
                        </th>
                        <th>
                            Expected Date of Defense
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <EmployeeRow key={index} employee={employee} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;