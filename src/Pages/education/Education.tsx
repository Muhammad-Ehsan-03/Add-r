
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Ieducation, Iemployees } from "../employees-crud/EmployeesCrud";
function Education() {

    let [search, setSearch] = useSearchParams();
    let [employeeIndex, setEmployeeIndex] = useState();
    let [employee, setEmployee] = useState<Iemployees>();
    let [employeeEducation, setEmployeeEducation] = useState<Array<Ieducation>>([]);
    
    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    // Get Data From localstorage
    useEffect(() => {
        const employeeId = Number(search.get('id'));
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees,i:any) => {
                if (em.id == employeeId) {
                    setEmployeeEducation(em.educations);
                    setEmployee(em);
                    setEmployeeIndex(i);
                }
            }
            )
        }
    }
        , []);

        const deleteEmployeeEducation = (e: any) => {
            EmployeesArray[employeeIndex!].educations.splice(e, 1);
            const newData = [...EmployeesArray];
            setEmployeesArray(newData);
            localStorage.setItem('EmployeesData', JSON.stringify(newData));
          }
    return (
        <div>
            <div className={'employees-education-list'}>
                <div className="Employees">
                    <div className="header-2">
                        <h4 className="  animate_animate__fadeInDownBig ">Qualification of {employee?.firstName} {employee?.lastName}</h4>
                        <div className="Add-Education">
                          <Link to="/add-education?educationId=0"><button type="button" className="btn btn-success" ><i className="fa-solid fa-book-open"></i>Add Education</button></Link>
                        </div>
                    </div>
                </div>
                {employeeEducation.length == 0 ? (
                    <div className="alert alert-danger" role="alert">
                        This Employee Education are not avaliable.
                    </div>
                ) : (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Level</th>
                                <th scope="col">Action1</th>
                                <th scope="col">Action2</th>
                            </tr>
                        </thead>
                        {
                            employeeEducation.map((em: Ieducation,i) => (
                                <tbody>
                                    <tr>
                                        <td>{em.title}</td>
                                        <td>{em.level}</td>
                                        <td className="text-danger"><i className="fa-solid fa-trash"  onClick={() => { deleteEmployeeEducation(i) }}></i></td>
                                        <td className="text-warning"><Link to={"/add-education?employeeId="+employee!.id+"&educationId="+em.id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                )
                }
            </div>
        </div>
    )
}
export default Education;