import { useEffect, useRef, useState } from 'react';
import Department, { Idepartment } from '../department/Department';
// import Department, { DepartmentDatatype } from './Department';
function EmployessCrud() {
  // Array For Employees Data
  let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

  // Array For Employees Data
  let [departmentArray, setdepartmentArray] = useState<Array<Idepartment>>([]);

  // Variable for getting Employees Data 
  let [firstName, setfirstName] = useState('');
  let [lastName, setlastName] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [contact, setContact] = useState(92);
  let [departmentCode, setDepartmentCode] = useState(100);
  // Variable for getting Employees Data  is End Here

  // Variable for getting Employees Education
  let [educationLevel, setEducationLevel] = useState(0);
  let [description, setDescription] = useState('');

  // Variable for Handling Employees Id 

  let [educationId, setEducationId] = useState(0);
  let eduId = useRef(0);

  // Show And Hide pages variable
  let [isEditingEducation, setisEditingEducation] = useState(false);
  let [isCreatingEducation, setisCreatingEducation] = useState(false);


  // Show And Hide pages variable
  let [isEditing, setisEditing] = useState(false);
  let [isCreating, setisCreating] = useState(false);
  let [isList, setisList] = useState(false);
  let [isEducationList, setisEducationList] = useState(false);
  let [allEmployeesList, setAllEmployeesList] = useState(true);
  let [isdepartment, setIsDepartment] = useState(false);
  let [isCrud, setIsCrud] = useState(true);
  // Variable for Handling Employees Id 
  let [employeeId, setEmployeeId] = useState(0);
  let empId = useRef(0);

  // Extra ids for some performance 
  let [extraid, setExtraid] = useState<number>(0);
  let [findEmployeeId, setfindEmployeeId] = useState<number>(0);
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
    if (localStorage.getItem('employeeId')) {
      empId.current = parseInt(localStorage.employeeId);
    }
    else {
      localStorage.setItem('employeeId', '0');
    }
    //Fetching data of departments
    if (localStorage.getItem('departmentData') != null) {
      console.log('page Refresh');
      const depData = JSON.parse(localStorage.departmentData);
      setdepartmentArray(depData);
    }
    else {
      console.log('page Refresh But Data Empty');
    }
  }, []);
  // function for Saving and Editing Employees data
  const addEmployee = () => {
    debugger
    if (firstName && lastName && email && address && contact) {
      if (isCreating == true) {
        EmployeesArray.push(
          {
            id: employeeId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            Address: address,
            contact: contact,
            departmentcode: departmentCode,
            educations: []
          }
        )
      }
    }
    console.log(EmployeesArray);
    if (isEditing == true) {
      // let index = findIndex(employeesId);
      let index;
      EmployeesArray.map((c, i) => {
        if (c.id == employeeId) {
          index = i;
        }
      });
      EmployeesArray[index].firstName = firstName;
      EmployeesArray[index].lastName = lastName;
      EmployeesArray[index].email = email;
      EmployeesArray[index].Address = address;
      EmployeesArray[index].contact = contact;
      EmployeesArray[index].departmentCode = departmentCode;
    }
    const newData = [...EmployeesArray];
    setEmployeesArray(newData);
    localStorage.setItem('EmployeesData', JSON.stringify(newData));
    setisList(false);
    setisCreating(false);
    setisEditing(false);
  }
  // Function For Handling Emplyess Creaing Data

  const handleCreatingData = () => {
    setisCreating(true);
    setisEditing(false);
    setisList(false);
    empId.current++;
    setEmployeeId(empId.current);
    localStorage.setItem('employeeId', JSON.stringify(empId.current));
    setfirstName('');
    setlastName('');
    setEmail('');
    setAddress('');
    setContact(92);
  }

  //  Function For Handling Emplyess Editing Data
  const handleEditingData = (e: any) => {
    debugger
    setisEditing(true);
    setisList(false);
    setisCreating(false);
    setDepartmentCode(e.code);
    setEmployeeId(e.id);
    setfirstName(e.firstName);
    setlastName(e.lastName);
    setEmail(e.email);
    setAddress(e.Address);
    setContact(e.contact);
  }

  // Function to show and hide input field by some button

  const showAndHide_div = () => {
    setisCreating(false);
    setisEditing(false);
    setisList(false);
  }
  // Helping function to find inde by Employee Id

  // const findIndex = (idd: any) => {
  //   let inde x;
  //   EmployeesArray.map((c, i) => {
  //     if (c.id == employeeId) {
  //       index = i;
  //     }
  //   });
  // }

  // show One Employee Data
  const viewEmployeeData = (e: any) => {
    setAllEmployeesList(false);
    setisList(true);
    setfindEmployeeId(e);
  }
  //  Delete Employee Data

  const deleteEmployeeData = (e: any) => {
    let index;
    EmployeesArray.map((c, i) => {
      if (c.id == e) {
        index = i;
      }
      EmployeesArray.splice(index, 1);
      setisList(false);
      setAllEmployeesList(true);
      const newData = [...EmployeesArray];
      setEmployeesArray(newData);
      localStorage.setItem('EmployeesData', JSON.stringify(newData));
    });

  }
  // Education Functions Start Now 

  //  Function For Handling Emplyess Creating Education

  const handleCreatingeducation = () => {
    setisEditingEducation(false);
    setisCreatingEducation(true);
    setisEducationList(false);
    setEducationLevel(0);
    setDescription('');
    eduId.current++
    setEducationId(eduId.current);
  }

  //  Function For Handling Emplyess Editing Education

  const handleEditingeducation = (e: any) => {
    setisCreatingEducation(false);
    setisEditingEducation(true);
    setisEducationList(true);
    setDescription(e.title);
    setEducationId(e.id);
    setEducationLevel(e.level);
  }

  // function for Saving and Editing Employees Education  data

  const addEmployeeEducation = () => {
    if (educationLevel && description) {
      if (isCreatingEducation == true) {
        EmployeesArray[extraid].educations.push({ id: educationId, title: description, level: educationLevel });
      }
      if (isEditingEducation == true) {
        let index;
        let indexEdu;
        EmployeesArray.map((d, i) => {
          d.educations.map((e: any, j: any) => {
            if (e.id == educationId) {
              index = i;
              indexEdu = j;
            }
          })
        }
        );
        EmployeesArray[index].educations[indexEdu].title = description;
        EmployeesArray[index].educations[indexEdu].level = educationLevel;
      }
      setisEditingEducation(false);
      setisCreatingEducation(false);
      setisEducationList(true);
    }
    const newData = [...EmployeesArray];
    setEmployeesArray(newData);
    localStorage.setItem('EmployeesData', JSON.stringify(newData));
  }
  //  Delete Employee Education

  const deleteEmployeeEducation = (e: any) => {
    EmployeesArray[extraid].educations.splice(e, 1);
    const newData = [...EmployeesArray];
    setEmployeesArray(newData);
    localStorage.setItem('EmployeesData', JSON.stringify(newData));
  }

  const callDepartment = () => {
    setIsDepartment(true);
    setIsCrud(false);
  }
  return (
    <div>
      <div className={isdepartment == true ? "div" : "div d-none"}>
        <Department></Department>
      </div>
      <div className={isCrud == true ? 'Crud' : "Crud d-none"}>
        {/*  Crud Header of Html  */}
        <div className="header">
          <div className="home_icon">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
          <div className="user_icon">
            <i className="fa-solid fa-user"></i> <h5>Employees Managment</h5>
          </div>
        </div>
        {/* Space Between header and body */}
        <div className="space"></div>
        {/* Crud Header is End Here */}

        {/* Creating Input Field for Getting Employees Data*/}
        <div className={isEditing == true || isCreating == true ? "input-field-main-div" : "input-fields-main-div d-none"}>
          <div className="header-input-field">
            <h4>Update Employee</h4>
            <div className="back-button">
              <button type="button" className="btn btn-success" onClick={showAndHide_div}><i className="fa-solid fa-circle-arrow-left"></i> BACK</button>
            </div>
          </div>
          <div className="input-field FirstName">First<p>Name</p><span>*</span><input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => { setfirstName(e.target.value) }} /></div>
          <div className="input-field LastName">Last<p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => { setlastName(e.target.value) }} /></div>
          <div className="input-field Email">Email<span>*</span><input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
          <div className="input-field Address">Address<span>*</span><input type="text" className="form-control" placeholder="Adress" value={address} onChange={(e) => { setAddress(e.target.value) }} /></div>
          <div className="input-field Contact">Contact<span>*</span><input type='Number' className="form-control" placeholder="Contact Number" value={contact} onChange={(e) => { let Contact = parseInt(e.target.value); setContact(Contact) }} /></div>
          <div className="input-field Department">Department<span>*</span>
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={departmentCode} onChange={(e) => { setDepartmentCode(parseInt(e.target.value)); }}>
              <option selected>Select Degree</option>
              {departmentArray.map((dp: Idepartment) => (
                <option value={dp.code}>{dp.department}</option>
              ))
              }
            </select>
          </div>
          {/* Button For Saving Employess Data */}
          <button type="button" className="btn btn-success" onClick={addEmployee}>Submit</button>
        </div>
        {/* Input Field for Getting Employees Data is End here*/}

        {/* All Employees List */}
        <div className={allEmployeesList == true ? 'all-employees-list' : 'all-employees-list d-none'}>
          <div className="header-2 all-Employees-List">
            <h4>Manage Employees</h4>
            {/* Department page open button*/}
            <div className="department-button">
              <button type="button" className="btn btn-success" onClick={callDepartment}>Department</button>
            </div>
            <div className="add-employee-button">
              <button type="button" className="btn btn-success" onClick={handleCreatingData}>Add</button>
            </div>
          </div>
          {
            EmployeesArray.map((emp: Iemployees) => (
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => { viewEmployeeData(emp.id) }}>View</button></td>
                  </tr>
                </tbody>
              </table>
            ))
          }
        </div>
        {/* Show Employees List */}
        <div className="emp-list">
          <div className={isList == true ? "employees-List div" : "employees-List div d-none"}>
            <div className="header-2 Employee-List">
              <h4>View Employees Information</h4>
              <div className="back-button">
                <button type="button" className="btn btn-success" onClick={() => { setAllEmployeesList(true); setisList(false); setisEducationList(false)}}>Back</button>
              </div>
            </div>
            {
              EmployeesArray.map((em: Iemployees, i) => (
                <table className={em.id == findEmployeeId ? 'table table-striped' : 'table table-striped d-none'}>
                  <tbody>
                    <tr>
                      <td><label><b>First Name</b></label></td>
                      <td>{em.firstName}</td>
                    </tr>
                    <tr>
                      <td><label><b>Last Name</b></label></td>
                      <td>{em.lastName}</td>
                    </tr>
                    <tr>
                      <td><label><b>Email</b></label></td>
                      <td>{em.email}</td>
                    </tr>
                    <tr>
                      <td><label><b>Address</b></label></td>
                      <td>{em.Address}</td>
                    </tr>
                    <tr>
                      <td><label><b>Contact</b></label></td>
                      <td>{em.contact}</td>
                    </tr>
                    <tr>
                      <td><label><b>Department</b></label></td>
                      {
                        departmentArray.map((dp: Idepartment) => (
                          <div className={dp.code == em.departmentcode ? 'dep' : 'dep d-none'}><td>{dp.department}</td></div>
                        ))
                      }
                    </tr>
                    {/* <tr>
                  <td><label><b>Contact</b></label></td>
                  <td>{emp.contact}</td>
                </tr> */}
                    <tr>
                      <td><label><b>Action 1</b></label></td>
                      <td className="text-warning"><i className="fa-solid fa-pen-to-square" onClick={() => { handleEditingData(em); }}></i></td>
                    </tr>
                    <tr>
                      <td><label><b>Action 2</b></label></td>
                      <td className="text-danger"><i className="fa-solid fa-trash" onClick={() => { deleteEmployeeData(em.id) }}></i></td>
                    </tr>
                    <tr>
                      <tr><button className="btn btn-success" onClick={() => { setisEducationList(true); setisList(true); setExtraid(i);}}>Qualification</button></tr>
                    </tr>
                  </tbody>
                </table>
              ))
            }
          </div>
        </div>

        {/* Employees html is end here */}

        {/* Start Education Html */}

        {/* Education Input Fields */}
        <div className={isEditingEducation == true || isCreatingEducation == true ? 'col-md-5 mx-auto' : 'col-md-5 d-none'}>
          <div className="Header">
            <h4 className="animate_animate__fadeInDownBig ">Update Employee</h4>
            <div className="back-button">
              <button type="button" className="btn btn-success" onClick={() => { setisEducationList(true); }}><i className="fa-solid fa-circle-arrow-left"></i> BACK</button>
            </div>
          </div>
          <div className="education-input-field">
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={description} onChange={(e) => { setDescription(e.target.value); }}>
              <option selected>Select Degree</option>
              <option value="Matriculation">Matriculation</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="MPhil">MPhil</option>
              <option value="PhD">PhD</option>
            </select>
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={educationLevel} onChange={(e) => { setEducationLevel(parseInt(e.target.value)) }} >
              <option selected>Select Level</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
            <div className="col-md-2 mx-auto">
              <button type="button" className="btn btn-success" onClick={addEmployeeEducation}>SUBMIT</button>
            </div>
          </div>
        </div>

        {/* Educaton List */}
        <div className={isEducationList == true ? 'employees-education-list' : 'employees-education-list d-none'}>
          <div className="Employees">
            <div className="header-2">
              <h4 className="  animate_animate__fadeInDownBig ">Qualification</h4>
              <div className="Add-Education">
                <button type="button" className="btn btn-success" onClick={handleCreatingeducation}><i className="fa-solid fa-book-open"></i>Add Education</button>
              </div>
            </div>
          </div>
          {
            EmployeesArray.map((emp: Iemployees, i) => (
              <div className={extraid == i ? 'education' : 'education d-none'}>
                {emp.educations.map((em: Ieducation, j) => (
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Level</th>
                        <th scope="col">Action1</th>
                        <th scope="col">Action2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{em.title}</td>
                        <td>{em.level}</td>
                        <td className="text-danger"><i className="fa-solid fa-trash" onClick={() => { deleteEmployeeEducation(j) }}></i></td>
                        <td className="text-warning"><i className="fa-solid fa-pen-to-square" onClick={() => { handleEditingeducation(em) }}></i></td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}
export default EmployessCrud;
export interface Iemployees {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Address: string;
  contact: Number;
  departmentcode: Number;
  educations: Array<Ieducation>;
}
export interface Ieducation {
  id: number;
  title: string;
  level: number;
}