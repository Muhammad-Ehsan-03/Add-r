import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Department, { Idepartment } from '../department/Department';
import { Iemployees } from "../employees-crud/EmployeesCrud";

function EmployeeDetails() {
    let [search, setSearch] = useSearchParams();
    let [employee, setEmployee] = useState<Iemployees>();

    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    // Array For Employees Data
    let [departmentArray, setdepartmentArray] = useState<Array<Idepartment>>([]);

    // Get Data From localstorage
    useEffect(() => {
        const employeeId = Number(search.get('id'));
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees) => {
                if (em.id === employeeId) {
                    setEmployee(em);
                }
            }
            )
        }
        //Fetching data of departments
        if (localStorage.getItem('departmentData') != null) {
            console.log('page Refresh');
            const depData = JSON.parse(localStorage.departmentData);
            setdepartmentArray(depData);
        }
    }
        , []);
    const deleteEmployeeData = (e: any) => {
        let index;
        EmployeesArray.map((c, i) => {
            if (c.id == e) {
                index = i;
            }
        });
        EmployeesArray.splice(index!, 1);
        const newData = [...EmployeesArray];
        setEmployeesArray(newData);
        localStorage.setItem('EmployeesData', JSON.stringify(newData));
    }
    return (
        <div>
            {/* Show Employees List */}
            <div className="emp-list">
                <div className="employees-List div">
                    <div className="header-2 Employee-List">
                        <h4>View Employees Information</h4>
                        <div className="back-button">
                            <button type="button" className="btn btn-success">Back</button>
                        </div>
                    </div>
                    {employee == null ? (
                        <div className="alert alert-danger" role="alert">
                            The employee of this ID does not exist.
                        </div>
                    ) : (
                        <table className='table table-striped'>
                            <tbody>                           <tr>
                                <td><label><b>First Name</b></label></td>
                                <td>{employee.firstName}</td>
                            </tr>
                                <tr>
                                    <td><label><b>Last Name</b></label></td>
                                    <td>{employee.lastName}</td>
                                </tr>
                                <tr>
                                    <td><label><b>Email</b></label></td>
                                    <td>{employee.email}</td>
                                </tr>
                                <tr>
                                    <td><label><b>Address</b></label></td>
                                    <td>{employee.Address}</td>
                                </tr>
                                <tr>
                                    <td><label><b>Contact</b></label></td>
                                    <td>{employee.contact}</td>
                                </tr>
                                <tr>
                                    <td><label><b>Department</b></label></td>
                                    {
                                        departmentArray.map((dp: Idepartment) => (
                                            <div className={dp.code == employee.departmentcode ? 'dep' : 'dep d-none'}><td>{dp.department}</td></div>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><label><b>Action 1</b></label></td>
                                    <td className="text-warning"><Link to={"/add-employee?id=" + employee.id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                </tr>
                                <tr>
                                    <td><label><b>Action 2</b></label></td>
                                    <td className="text-danger"><Link to="/employees-crud"><i className="fa-solid fa-trash" style={{color:"red"}} onClick={() => { deleteEmployeeData(employee.id) }}></i></Link></td>
                                </tr>
                                <tr>
                                    <td><Link to={"/education?id=" + employee.id}><button className="btn btn-success">Qualification</button></Link></td>
                                    <td><Link to={"/print-one-employee-skills?ide=" + employee.id}><button className="btn btn-success">Skills</button></Link></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default EmployeeDetails;