import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
function Department() {

    // Array For Employees Data
    let [departmentData, setdepartmentData] = useState<Array<Idepartment>>([]);

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
    //  Function for Delete Employee Data
    const deleteDepartment = (e: any) => {
        let index;
        departmentData.map((d, i) => {
            if (d.id == e) {
                index = i;
            }
        }
        )
        departmentData.splice(index!, 1);
        const newData = [...departmentData];
        setdepartmentData(newData);
        localStorage.setItem('departmentData', JSON.stringify(newData));
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


            

            {/* All Employees List */}

            <div className="department-list">
                <div className="employees List">
                    <div className="header-2 depatment-list">
                        <h4>Manage DepartMent</h4>
                        <div className="back-button">
                           <Link to={"/add-department?depId=0"}> <button type="button" className="btn btn-success">Add</button></Link>
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
                                        <td className="text-warning"><Link to={"/add-department?depId="+dp.id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
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