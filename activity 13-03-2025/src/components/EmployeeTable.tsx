import { EmployeeDetailProps  } from "../types/types";
import EmployeeRow from "./EmployeeRow";

interface EmployeeTableProps {
    employees: EmployeeDetailProps[];
    onDelete: (employee: EmployeeDetailProps) => void;
    onUpdate: (employee: EmployeeDetailProps) => void;
}

const EmployeeTable = ({
    employees,
    onDelete,
    onUpdate,
}: EmployeeTableProps ) => {

    return (
        <div className="flex justify-center ">
           <table className="w-[80%]">
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
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <EmployeeRow key={index} employee={employee} onDelete={onDelete} onUpdate={onUpdate}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;