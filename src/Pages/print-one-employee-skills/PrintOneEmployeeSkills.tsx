import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {  Iemployees } from "../employees-crud/EmployeesCrud";
import { IoneEmployeeSkill } from "../skills/Skills";
import Skills from '../skills/Skills';
import { Iskill } from "../add-skills/AddSkills";
function PrintOneEmployeeSkills() {
    let [search, setSearch] = useSearchParams();
    let [employeeIndex, setEmployeeIndex] = useState();
    let [employee, setEmployee] = useState<Iemployees>();
    let [employeeSkills, setEmployeeSkills] = useState<Array<IoneEmployeeSkill>>([]);
    
    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    
    // Array For Employees Data
    let [array, setArray] = useState<Array<Iemployees>>([]);

    let[skillData,setSkillData] = useState<Array<Iskill>>([]);
    
    // Get Data From localstorage

    let employeeId = Number(search.get('ide'));

    useEffect(() => {
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees,i:any) => {
                if (em.id == employeeId) {
                    setEmployeeSkills(em.skills);
                    setEmployee(em);
                    setEmployeeIndex(i);
                }
            }
            )
        }
        if (localStorage.getItem('skillData') != null) {
            const employees = JSON.parse(localStorage.skillData);
            setSkillData(employees);
        }
    }
        , []);

        const deleteEmployeeSkill = (e: any) => {
            EmployeesArray.map((em: Iemployees,i:any) => {
                if (em.id ==employeeId ) {
                   em.skills.map((sk:IoneEmployeeSkill,i:any) => {
                    if(sk.id==e)
                    {
                        em.skills.splice(i, 1);
                    }
                   })
                }
            }
            )
            const newData = [...EmployeesArray];
            setEmployeesArray(newData);
            localStorage.setItem('EmployeesData', JSON.stringify(newData));
            }
    return (
        <div>
            <div className={'employees-education-list'}>
                <div className="Employees">
                    <div className="header-2">
                        <h4 className="  animate_animate__fadeInDownBig ">Skills of {employee?.firstName} {employee?.lastName}</h4>
                        <div className="Add-Education">
                            <Link to={"/skills?idd=0&empId="+employee?.id}><button type="button" className="btn btn-success" ><i className="fa-solid fa-book-open"></i>Add Skills</button></Link>
                        </div>
                    </div>
                </div>
                { employeeSkills.length == 0 ? (
                    <div className="alert alert-danger" role="alert">
                        This Employee Education are not avaliable.
                    </div>
                ) : (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope="col">Skill Name</th>
                                <th scope="col">Level</th>
                                <th scope="col">Action1</th>
                                <th scope="col">Action2</th>
                            </tr>
                        </thead>
                        {
                            employeeSkills.map((em: IoneEmployeeSkill, i) => (
                                <tbody>
                                    <tr>
                                            {
                                                skillData.map((sk:Iskill) => (
                                                <td className={sk.id==em.id?'show' : 'show d-none'}>{sk.name}</td>       
                                                ))
                                            }
                                        <td>{em.level}</td>
                                        <td className="text-danger"><i className="fa-solid fa-trash" onClick={() => { deleteEmployeeSkill(em.id); }}></i></td>
                                        <td className="text-warning"><Link to={"/skills?empId=" + employee!.id + "&sklId=" + em.id+"&idd=1"}><i className="fa-solid fa-pen-to-square"></i></Link></td>
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
export default PrintOneEmployeeSkills;