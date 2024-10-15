import { useEffect, useRef, useState } from "react";
import { Idepartment } from "../department/Department";
import { Link, useSearchParams } from "react-router-dom";

function AddDepartment() {
    debugger;
    let [search, setSearch] = useSearchParams();
    // Variable for getting Employees Data 

    let [departmentName, setDepartmentName] = useState('');
    let [description, setDescription] = useState('');
    let [code, setCode] = useState<number>(100);

    // Array For Employees Data
    let [departmentData, setdepartmentData] = useState<Array<Idepartment>>([]);

    // Variable for Handling Department Id 

    let [departmentid, setdepartmentId] = useState<number>();
    let departmentIdd = useRef(0);
    let departmentCode = useRef(100);

    let dpId=Number(search.get('depId'));
    useEffect(() => {       
        //  Fetching data of Department
        if (localStorage.getItem('departmentData') != null) {
            console.log('page Refresh');
            const oldData = JSON.parse(localStorage.departmentData);
            setdepartmentData(oldData);
            oldData.map((dp:Idepartment) => {
                if(dpId==dp.id)
                {
                    setdepartmentId(dp.id);
                    setDepartmentName(dp.department);
                    setDescription(dp.description);
                }
            })
        }
        if (localStorage.getItem('dpCode')) {
            departmentCode.current = parseInt(localStorage.dpCode);
        }
        else {
            localStorage.setItem('dpCode', '100');
        }
        if (localStorage.getItem('depatmentIde')) {
            departmentIdd.current = parseInt(localStorage.depatmentIde);
        }
        else {
            localStorage.setItem('depatmentIde', '100');
        }
        
    if(dpId==0)
        {
            console.log('department Code before = ',departmentCode)
            departmentIdd.current++;
            setdepartmentId(departmentIdd.current);
            departmentCode.current++;
            setCode(departmentCode.current);
            console.log('department Code before = ',departmentCode.current)
            localStorage.setItem('dpCode', JSON.stringify(departmentCode.current));
            localStorage.setItem('depatmentIde', JSON.stringify(departmentIdd.current));
        }
        console.log('Hello');

    }, []);

    // function for Saving and Editing Department data

    const addEmploy = () => {
        if (dpId == 0) {
            if (departmentid && departmentName && description) {
                departmentData.push(
                    {
                        code: code,
                        id: departmentid,
                        department: departmentName,
                        description: description
                    }
                )
                const newData = [...departmentData];
                setdepartmentData(newData);
                localStorage.setItem('departmentData', JSON.stringify(newData));
            }
        }
        if (dpId > 0) {
            let index;
            departmentData.map((d, i) => {
                if (d.id == departmentid) {
                    index = i;
                }
            }
            )
            departmentData[index!].description = description;
            departmentData[index!].department = departmentName;
            const newData = [...departmentData];
            setdepartmentData(newData);
            localStorage.setItem('departmentData', JSON.stringify(newData));
        }
    }
    return (
        <div className="">
            {/* Creating Input Field for Getting Employees Data*/}
            < div className="department-input-field">
                <div className="Header">
                    <h4>Update Department</h4>
                </div>
                <div className="input-field department">Department <p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Enter Department Name" value={departmentName} onChange={(e: any) => { setDepartmentName(e.target.value) }} /></div>
                <div className="input-field description"> Description<span>*</span><input type="text" className="form-control" placeholder="Enter Department Description" value={description} onChange={(e: any) => { setDescription(e.target.value) }} /></div>
                <div className="col-md-2 mx-auto">
                   <Link to="/"> <button type="button" onClick={() => { addEmploy(); }} className="btn btn-success">SUBMIT</button></Link></div>
            </div>
        </div>
    )
}
export default AddDepartment