import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Iskill } from '../add-skills/AddSkills';
import { IoneEmployeeSkill } from '../skills/Skills';
// import Department, { DepartmentDatatype } from './Department';
function EmployessCrud() {
  // Array For Employees Data
  let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);
  // Get Data From localstorage
  useEffect(() => {
    //  Fetching data of Employess
    if (localStorage.getItem('EmployeesData') != null) {
      console.log('page Refresh');
      const oldEmployessData = JSON.parse(localStorage.EmployeesData);
      setEmployeesArray(oldEmployessData);
    }
    else {
      console.log('page Refresh But Data Empty');
    }
  }, []);
  return (
    <div>
      {/* Space Between header and body */}
      <div className="space"></div>
      {/* Crud Header is End Here */}


      {/* All Employees List */}
      <div className='all-employees-list'>
        <div className="header-2 all-Employees-List">
          <h4>Manage Employees</h4>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Employees Name</th>
            </tr>
          </thead>
          {
            EmployeesArray.map((emp: Iemployees) => (
              <tbody>
                <tr>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td><Link to={"/employeeDetails?id=" + emp.id}><button type="button" className="btn btn-info">View</button></Link></td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>

      {/* Employees html is end here */}

      {/* Start Education Html */}

    </div>
  )
}
export default EmployessCrud;
export interface Iemployees {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Address: string;
  contact: number;
  departmentcode: number;
  educations: Array<Ieducation>;
  skills: Array<IoneEmployeeSkill>;
}
export interface Ieducation {
  id: number;
  title: string;
  level: number;
}