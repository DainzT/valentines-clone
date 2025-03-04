

interface EmployeeProps {
    name: string
    salary: number
}

interface EmployeeListProps {
    data: Array<EmployeeProps>
}

const EmployeeData = ({
    data
}: EmployeeListProps) => {
    return (
        <>
            <div>
                <h1>Entry Level</h1>
                {data.filter((employee) => employee.salary < 50000).
                    map((employee, index) => (
                   <ul
                    key={index}
                   >
                            <li>
                                <label>{employee.name}</label>
                                <label>{employee.salary}</label>
                            </li>

                    </ul> 
                ))}
                <h1>Senior</h1>
                {data.filter((employee) => employee.salary >= 50000).
                    map((employee, index) => (
                   <ul
                    key={index}
                   >
                            <li>
                                <label>{employee.name}</label>
                                <label>{employee.salary}</label>
                            </li>

                    </ul> 
                ))}
            </div>
        </>
    );
};

export default EmployeeData;