import { EmployeeDetailProps } from "../types/types";

const EmployeeRow = ({ employee }: { employee: EmployeeDetailProps }) => {
    return (
        <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.groupName}</td>
            <td>{employee.role}</td>
            <td>{employee.expectedSalary}</td>
            <td>{employee.expectedDateofDefense}</td>
        </tr>
    );
};

export default EmployeeRow;