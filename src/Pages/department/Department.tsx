import { useEffect, useRef, useState } from 'react';
function Department() {

    // Array For Employees Data
    let [departmentData, setdepartmentData] = useState<Array<Idepartment>>([]);

    // Variable for getting Employees Data 

    let [departmentName, setDepartmentName] = useState('');
    let [description, setDescription] = useState('');
    let [code, setCode] = useState<number>(100);

    // Variable for Handling Department Id 

    let [departmentid, setdepartmentId] = useState<number>();
    let departmentIdd = useRef(0);

    // Variable for Handling Department Id

    let departmentCode = useRef(100);

    // Show And Hide pages variable

    let [isCreating, setIsCreating] = useState(false);
    let [isEditing, setIsEditing] = useState(false);
    // let [isdepartment, setdepartment] = useState(true);
    let [isList, setIsList] = useState(true);

    // Get Data From localstorage

    useEffect(() => {
        //  Fetching data of Department
        if (localStorage.getItem('departmentData') != null) {
            console.log('page Refresh');
            const oldData = JSON.parse(localStorage.departmentData);
            setdepartmentData(oldData);
        }
        else {
            console.log('page Refresh But Data Empty');
        }
    }, []);

    // function for Saving and Editing Department data

    const addEmploy = () => {
        debugger;
        if (isCreating == true) {
            if (departmentid && departmentName && description) {
                departmentData.push(
                    {
                        code: code,
                        id: departmentid,
                        department: departmentName,
                        description: description
                    }
                )
            }
        }
        if (isEditing == true) {
            let index;
            departmentData.map((d, i) => {
                if (d.id == departmentid) {
                    index = i;
                }
            }
            )
            departmentData[index].description = description;
            departmentData[index].department = departmentName;
        }

        const newData = [...departmentData];
        setdepartmentData(newData);
        localStorage.setItem('departmentData', JSON.stringify(newData));

        setIsList(true);
        setIsCreating(false);
        setIsEditing(false);
    }


    // Function For Handling Department Editing Data
    const handleCreatingDepartmentData = () => {
        setDescription('');
        setDepartmentName('');
        departmentIdd.current++;
        setdepartmentId(departmentIdd.current);
        departmentCode.current++;
        setCode(departmentCode.current);
        setIsList(false);
        setIsEditing(false);
        setIsCreating(true);
    }

    // Function For Handling Department Creaing Data
    const handleEditingDepartmentData = (e: any) => {
        setdepartmentId(e.id);
        setDepartmentName(e.department);
        setDescription(e.description);
        setIsList(false);
        setIsEditing(true);
        setIsCreating(false);
    }

    //  Function for Delete Employee Data
    const deleteDepartment = (e: any) => {
        let index;
        departmentData.map((d, i) => {
            if (d.id == e) {
                index = i;
            }
        }
        )
        departmentData.splice(index, 1);
        const newData = [...departmentData];
        setdepartmentData(newData);
        localStorage.setItem('departmentData', JSON.stringify(newData));
    }

    // Function to show and hide input field by some button
    const changes = () => {
        setIsList(true);
        setIsEditing(false);
        setIsCreating(false);
    }


    return (
        <div>
            {/*  Header of Department page  */}
            <div className="header">
                <div className="home_icon">
                    <i className="fa-solid fa-house-chimney"></i>
                </div>
                <div className="user_icon">
                    <i className="fa-solid fa-user"></i> <h5>Department Managment</h5>
                </div>
            </div>

            {/* Space Between header and body */}
            <div className="space"></div>


            {/* Creating Input Field for Getting Employees Data*/}
            <div className={isEditing == true || isCreating == true ? "department-input-field" : "department-input-field d-none"}>
                <div className="Header">
                    <h4>Update Department</h4>
                    <div className="back-button">
                        <button type="button" onClick={changes} className="btn btn-success"><i className="fa-solid fa-circle-arrow-left"> </i> BACK</button>
                    </div>
                </div>
                <div className="input-field department">Department <p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Enter Department Name" value={departmentName} onChange={(e: any) => { setDepartmentName(e.target.value) }} /></div>
                <div className="input-field description"> Description<span>*</span><input type="text" className="form-control" placeholder="Enter Department Description" value={description} onChange={(e: any) => { setDescription(e.target.value) }} /></div>
                <div className="col-md-2 mx-auto">
                    <button type="button" className="btn btn-success" onClick={addEmploy}>SUBMIT</button></div>
            </div>

            {/* All Employees List */}

            <div className="department-list">
                <div className={isList == true ? "employees List" : "employees List d-none"}>
                    <div className="header-2 depatment-list">
                        <h4>Manage DepartMent</h4>
                        <div className="back-button">
                            <button type="button" className="btn btn-success" onClick={handleCreatingDepartmentData}>Add</button>
                        </div>
                        <div className="back-button">
                            <button type="button" className="btn btn-success"><i className="fa-solid fa-circle-arrow-left"> </i>Back</button>
                        </div>
                    </div>
                    {
                        departmentData.map((dp: Idepartment) => (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Department code</th>
                                        <th scope="col">Department Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{dp.code}</td>
                                        <td>{dp.department}</td>
                                        <td>{dp.description}</td>
                                        <td className="text-danger"><i className="fa-solid fa-trash" onClick={() => { deleteDepartment(dp.id) }}></i></td>
                                        <td className="text-warning"><i className="fa-solid fa-pen-to-square" onClick={() => { handleEditingDepartmentData(dp); }}></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Department;
export interface Idepartment {
    code: number;
    id: number;
    department: string;
    description: string;
};

// <div className={isCrud==true?"div":"div d-none"}>
// <EmployessCrud></EmployessCrud>
// </div>
// {isdepartment == true ? "main" : "main d-none"} 