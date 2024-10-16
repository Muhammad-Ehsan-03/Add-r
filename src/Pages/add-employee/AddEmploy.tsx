import { useEffect, useRef, useState } from "react";
import { Idepartment } from "../department/Department";
import { Iemployees } from "../employees-crud/EmployeesCrud";
import { Link, useSearchParams } from "react-router-dom";
function AddEmploy() {
    let [search, setSearch] = useSearchParams();

    // Id For check Editing and Creating

    // let [id, setId] = useState<number>(0);
    let id = 0;
    // Variable for getting Employees Data 
    let [firstName, setfirstName] = useState('');
    let [lastName, setlastName] = useState('');
    let [email, setEmail] = useState('');
    let [address, setAddress] = useState('');
    let [contact, setContact] = useState(92);
    let [departmentCode, setDepartmentCode] = useState<number>(100);
    // Variable for getting Employees Data  is End Here

    // Variable for Handling Employees Id 
    let [employeeId, setEmployeeId] = useState(0);
    const empId = useRef(0);

    // Array For Employees Data
    let [departmentArray, setdepartmentArray] = useState<Array<Idepartment>>([]);

    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    // Get Data From localstorage

    id = Number(search.get('id'));

    useEffect(() => {
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees) => {
                if (em.id == id) {
                    setEmployeeId(em.id);
                    setfirstName(em.firstName);
                    setlastName(em.lastName);
                    setAddress(em.Address);
                    setEmail(em.email);
                    setContact(em.contact);
                    setEmployeeId(em.id);
                    setDepartmentCode(em.departmentcode)
                }
            }
            );
        }
        //Fetching data of departments
        if (localStorage.getItem('departmentData') != null) {
            console.log('page Refresh');
            const depData = JSON.parse(localStorage.departmentData);
            setdepartmentArray(depData);
        }
        if (localStorage.getItem('employeeId')) {
            empId.current = parseInt(localStorage.employeeId);
        }
        else {
            localStorage.setItem('employeeId', '0');
        }
        if (id == 0) {
            empId.current++;
            setEmployeeId(empId.current);
            localStorage.setItem('employeeId', JSON.stringify(empId.current));
        }
    }, []);
    // function for Saving and Editing Employees data
    const addEmployee = () => {
        if (firstName && lastName && email && address && contact) {
            if (id == 0) {
                EmployeesArray.push(
                    {
                        id: employeeId,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        Address: address,
                        contact: contact,
                        departmentcode: departmentCode,
                        educations: [],
                        skills:[]
                    }
                )
                const newData = [...EmployeesArray];
                setEmployeesArray(newData);
                localStorage.setItem('EmployeesData', JSON.stringify(newData));
            }
        }
        if (id !== 0) {
            // let index = findIndex(employeesId);
            let index;
            EmployeesArray.map((c, i) => {
                if (c.id == employeeId) {
                    index = i;
                }
            });
            EmployeesArray[index!].firstName = firstName;
            EmployeesArray[index!].lastName = lastName;
            EmployeesArray[index!].email = email;
            EmployeesArray[index!].Address = address;
            EmployeesArray[index!].contact = contact;
            EmployeesArray[index!].departmentcode = departmentCode;
            const newData = [...EmployeesArray];
            setEmployeesArray(newData);
            localStorage.setItem('EmployeesData', JSON.stringify(newData));
        }
    }

    return (
        <div>
            {/* Creating Input Field for Getting Employees Data*/}
            <div className="input-field-main-div">
                <div className="header-input-field">
                    <h4>Update Employee</h4>
                    <div className="back-button">
                        <button type="button" className="btn btn-success"><i className="fa-solid fa-circle-arrow-left"></i> BACK</button>
                    </div>
                </div>
                <div className="input-field FirstName">First<p>Name</p><span>*</span><input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => { setfirstName(e.target.value) }} /></div>
                <div className="input-field LastName">Last<p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => { setlastName(e.target.value) }} /></div>
                <div className="input-field Email">Email<span>*</span><input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
                <div className="input-field Address">Address<span>*</span><input type="text" className="form-control" placeholder="Adress" value={address} onChange={(e) => { setAddress(e.target.value) }} /></div>
                <div className="input-field Contact">Contact<span>*</span><input type='Number' className="form-control" placeholder="Contact Number" value={contact} onChange={(e) => { let Contact = parseInt(e.target.value); setContact(Contact) }} /></div>
                <div className="input-field Department">Department<span>*</span>
                    <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={departmentCode} onChange={(e) => { setDepartmentCode(parseInt(e.target.value)); }}>
                        <option value={0}>Select Degree</option>
                        {departmentArray.map((dp: Idepartment) => (
                            <option key={dp.id} value={dp.code}>{dp.department}</option>
                        ))
                        }
                    </select>
                </div>
                {/* Button For Saving Employess Data */}
                <Link to="/"><button type="button" className="btn btn-success col-md-12" onClick={addEmployee}>Submit</button></Link>
            </div>
        </div>
    )
}
export default AddEmploy