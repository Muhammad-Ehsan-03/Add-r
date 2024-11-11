import { useEffect, useRef, useState } from "react";
import { Idepartment } from "../department/Department";
import { Iemployees } from '../employees-crud/EmployeesCrud';
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
function AddEmploy() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    let [search, setSearch] = useSearchParams();

    let [index, setIndex] = useState();

    // Id For check Editing and Creating

    // let [id, setId] = useState<number>(0);
    let id = 0;
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
            employees.map((em: Iemployees, i: any) => {
                if (em.id == id) {
                    setEmployeeId(em.id);
                    setIndex(i);
                    reset(em);
                }
            });
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
    const addEmployee = (data: any) => {
        if (id == 0) {
            data.educations = [];
            data.skills = [];
            data.id = employeeId;
            EmployeesArray.push(data);
            const newData = [...EmployeesArray];
            setEmployeesArray(newData);
            localStorage.setItem('EmployeesData', JSON.stringify(newData));
        }
        if (id > 0) {
            // let index = findIndex(employeesId);
            let indexOfEmployee;
            EmployeesArray.map((c, i) => {
                if (c.id == employeeId) {
                    indexOfEmployee = i;
                }
            });
            EmployeesArray[indexOfEmployee!].firstName = data.firstName;
            EmployeesArray[indexOfEmployee!].lastName = data.lastName;
            EmployeesArray[indexOfEmployee!].email = data.email;
            EmployeesArray[indexOfEmployee!].Address = data.Address;
            EmployeesArray[indexOfEmployee!].contact = data.contact;
            EmployeesArray[indexOfEmployee!].departmentcode = data.departmentcode;
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
                </div>
                <form onSubmit={handleSubmit(addEmployee)}>
                    <div className="input-field FirstName">First<p>Name</p><span>*</span><input type="text" className="form-control" placeholder="First Name"
                        {...register("firstName", {
                            required: { value: true, message: 'First Name is Required' },
                            minLength: { value: 3, message: "First Name At least 3 charactres" },
                            maxLength: { value: 20, message: "First Name Maximum charactres is 20" },
                        })}
                    />
                    </div>
                    {errors.firstName && <span style={{ color: "red" }} id="errors">{errors.firstName.message}</span>}
                    <div className="input-field LastName">Last<p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Last Name" {...register("lastName",
                        {
                            required: { value: true, message: 'Last Name is Required' },
                            minLength: { value: 3, message: "Last Name At least 3 charactres" },
                            maxLength: { value: 20, message: "Last Name Maximum charactres is 20" },
                        }
                    )}
                    />
                    </div>
                    {errors.lastName && <span style={{ color: "red" }} id="errors">{errors.lastName.message}</span>}
                    <div className="input-field Email">Email<span>*</span><input type="email" className="form-control" placeholder="Email" {...register("email", {
                        required: { value: true, message: 'Email is Required' },
                    })}
                    /></div>
                    {errors.email && <span style={{ color: "red" }} id="errors">{errors.email.message}</span>}
                    <div className="input-field Address">Address<span>*</span><input type="text" className="form-control" placeholder="Address" {...register("Address", {
                        required: { value: true, message: 'Address is Required' },
                        minLength: { value: 5, message: "Address At least 5 charactres" },
                        maxLength: { value: 50, message: "Address Maximum charactres is 50" },
                    })}
                    />
                    </div>
                    {errors.Address && <span style={{ color: "red" }} id="errors">{errors.Address.message}</span>}
                    <div className="input-field">Contact<span>*</span><input type='number' className="form-control" placeholder="Contact Number" {...register("contact", {
                        required: { value: true, message: 'Contact is required' },
                        minLength: { value: 11, message: "Contact integers lenght is 11" },
                        maxLength: { value: 11, message: "Contact integers lenght is 11" },
                    })} />
                    </div>
                    {errors.contact && <span style={{ color: "red" }} id="errors">{errors.contact.message}</span>}
                    <div className="input-field Department">Department<span>*</span>
                        {/* value={departmentCode} onChange={(e) => { setDepartmentCode(parseInt(e.target.value));}} */}
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example" {...register("departmentcode", {
                            required: { value: true, message: 'Department is required' },
                        })}
                        >
                            <option value="">Select Degree</option>
                            {departmentArray.map((dp: Idepartment) => (
                                <option key={dp.id} value={dp.code}>{dp.department}</option>
                            ))
                            }
                        </select>
                    </div>
                    {errors.departmentcode && <span style={{ color: "red" }} id="errors">{errors.departmentcode.message}</span>}
                    {/* Button For Saving Employess Data */}
                    <button type="submit" className="btn btn-success col-md-12">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddEmploy