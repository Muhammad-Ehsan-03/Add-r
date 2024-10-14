import { useEffect, useRef, useState } from "react";
import { Ieducation, Iemployees } from "../employees-crud/EmployeesCrud";
import { json, Link, useSearchParams } from "react-router-dom";

function Add_Education() {
    let [search, setSearch] = useSearchParams();

    let [index, setIndex] = useState<number>(0);
    let [education, setEducation] = useState<Ieducation>();
    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    // Variable for getting Employees Education
    let [educationLevel, setEducationLevel] = useState(0);
    let [title, setTitle] = useState('');

    // Variable for Handling Employees Id 

    let [educationId, setEducationId] = useState(0);
    let eduId = useRef(0);

    let [educationIdForEdit, setEducationIdForEdit] = useState(0);

    useEffect(() => {
        let index = Number(search.get('employeeId'));
        let educationIde = Number(search.get('educationId'));
        setEducationIdForEdit(educationIde);
        setIndex(index);
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees) => {
                em.educations.map((emp: Ieducation) => {
                    if (emp.id == educationIde) {
                        setEducation(emp);
                        setEducationId(emp.id);
                        setEducationLevel(emp.level);
                        setTitle(emp.title)
                    }
                })
            })
        }
        if (localStorage.getItem('ide')) {
            eduId.current = parseInt(localStorage.ide);
        }
        else {
            localStorage.setItem('ide', '0');
        }
        if (educationIde==0) {
            console.log("EducationIdBefore = ",eduId);
            eduId.current++;
            setEducationId(eduId.current);
            localStorage.setItem('ide', JSON.stringify(eduId.current));
            eduId.current = parseInt(localStorage.ide);
            console.log("EducationIdAfter = ",eduId);


        }

    }, []);


    // function for Saving and Editing Employees Education  data
    const addEmployeeEducation = () => {
        if (educationLevel && title) {
            if (educationIdForEdit>0) {

                let indexOfEmployee;
                let indexEdu;
                EmployeesArray.map((d, i) => {
                    d.educations.map((e: any, j: any) => {
                        if (e.id == educationId) {
                            indexOfEmployee = i;
                            indexEdu = j;
                        }
                    })
                }
                );
                EmployeesArray[indexOfEmployee!].educations[indexEdu!].title = title;
                EmployeesArray[indexOfEmployee!].educations[indexEdu!].level = educationLevel;
            }
            if(educationIdForEdit==0) {
                EmployeesArray[index].educations.push({ id: educationId, title: title, level: educationLevel });
            }
        }
        const newData = [...EmployeesArray];
        setEmployeesArray(newData);
        localStorage.setItem('EmployeesData', JSON.stringify(newData));
    }
    return (
        <div>
            {/* Education Input Fields */}
            <div className='col-md-5 mx-auto'>
                <div className="Header">
                    <h4 className="animate_animate__fadeInDownBig ">Update Employee</h4>
                    <div className="back-button">
                        <button type="button" className="btn btn-success"><i className="fa-solid fa-circle-arrow-left"></i> BACK</button>
                    </div>
                </div>
                <div className="education-input-field">
                    <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={title} onChange={(e) => { setTitle(e.target.value); }}>
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
                        <Link to="/"><button type="button" className="btn btn-success" onClick={addEmployeeEducation}>SUBMIT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Add_Education;
