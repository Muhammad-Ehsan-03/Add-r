import { useEffect, useRef, useState } from "react";
import { Idepartment } from "../department/Department";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddDepartment() {
    let [search, setSearch] = useSearchParams();
    // Variable for getting Employees Data 

    const { register, handleSubmit, formState: { errors },reset } = useForm();

    let [code, setCode] = useState<number>(100);

    // Array For Employees Data
    let [departmentData, setdepartmentData] = useState<Array<Idepartment>>([]);

    // Variable for Handling Department Id 

    let [departmentId, setDepartmentId] = useState<number>(0);
    let departmentIdd = useRef(0);
    let departmentCode = useRef(100);

    let dpId = Number(search.get('depId'));

    useEffect(() => {
        //  Fetching data of Department
        if (localStorage.getItem('departmentData') != null) {
            console.log('page Refresh');
            const oldData = JSON.parse(localStorage.departmentData);
            setdepartmentData(oldData);
            oldData.map((dp: Idepartment) => {
                if (dpId == dp.id) {
                    setDepartmentId(dp.id);
                    reset(dp)
                }
            })
        }
        if (localStorage.getItem('dpCode')) {
            departmentCode.current = parseInt(localStorage.dpCode);
        }
        else {
            localStorage.setItem('dpCode', '100');
        }
        if (localStorage.getItem('departmentIde')) {
            departmentIdd.current = parseInt(localStorage.departmentIde);
        }
        else {
            localStorage.setItem('departmentIde', '0');
        }
        if (dpId == 0) {
            departmentIdd.current++;
            setDepartmentId(departmentIdd.current);
            departmentCode.current++;
            setCode(departmentCode.current);
            localStorage.setItem('dpCode', JSON.stringify(departmentCode.current));
            localStorage.setItem('departmentIde', JSON.stringify(departmentIdd.current));
        }
    }, []);


    // function for Saving and Editing Department data

    const add = (data: any) => {
        if (data.description&& data.department) {
            if (dpId == 0) {
                    data.code = code;
                    console.log("Hello = ", departmentId)
                    data.id = departmentId;
                    departmentData.push(data);
                    const newData = [...departmentData];
                    setdepartmentData(newData);
                    localStorage.setItem('departmentData', JSON.stringify(newData));
                }
            if (dpId > 0) {
                let index;
                departmentData.map((d, i) => {
                    if (d.id == departmentId) {
                        index = i;
                    }
                }
                )
                departmentData[index!].description = data.description;
                departmentData[index!].department = data.department;
                const newData = [...departmentData];
                setdepartmentData(newData);
                localStorage.setItem('departmentData', JSON.stringify(newData));
            }
        }
        }
    return (
        <div className="">
            {/* Creating Input Field for Getting Employees Data*/}
            < div className="department-input-field">
                <div className="Header">
                    <h4>Update Department</h4>
                </div>
                <form onSubmit={handleSubmit(add)}>
                    <div className="input-field department">Department <p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Enter Department Name" {...register("department", {
                        required: { value: true, message: 'Department is required' },
                        minLength: { value: 3, message: "Department at least three characters" },
                        maxLength: { value: 20, message: "Department Maximum characters is 30" },
                    })} /></div>
                    {errors.department && <span style={{ color: "red" }} id="errors">{errors.department.message}</span>}
                    <div className="input-field description"> Description<span>*</span><input type="text" className="form-control" placeholder="Enter Department Description" {...register("description", {
                        required: { value: true, message: 'Department description is required' },
                        minLength: { value: 8, message: "Department description at least three characters" },
                        maxLength: { value: 40, message: "Department description Maximum characters is 30" },
                    })} /></div>
                    {errors.description && <span style={{ color: "red" }} id="errors">{errors.description.message}</span>}
                    <div className="col-md-2 mx-auto">
                        <button type="submit" className="btn btn-success">SUBMIT</button></div>
                </form>
            </div>
        </div>
    )
}
export default AddDepartment