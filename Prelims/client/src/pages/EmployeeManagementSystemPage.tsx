import EmployeeData from "../components/EmployeeData";
const EmployeeManagementSystemPage = () => {
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
                    }   
                ]}
            />
        </>
    );
};

export default EmployeeManagementSystemPage;