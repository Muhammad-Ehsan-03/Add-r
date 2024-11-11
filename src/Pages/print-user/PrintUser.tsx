import axios from "axios";
import { useEffect, useState } from "react";

function PrintUser(){
    debugger;
    let [employeesArray, setEmployeesArray] = useState([]);
    let backendBaseUrl = "https://reqres.in/";

    useEffect(() => {
        const userRequest = axios.get(backendBaseUrl + "api/users", {
            params: {
                page: 1
            }
        });
        userRequest.then((response) => {
            setEmployeesArray(response.data.data);
        })
    },
        [])
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
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    {
                        employeesArray.map((emp: any) => (
                            <tbody>
                                <tr>
                                    <td>{emp.id}</td>
                                    <td>{emp.first_name}</td>
                                    <td>{emp.last_name}</td>
                                    <td>{emp.email}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}
export default PrintUser;