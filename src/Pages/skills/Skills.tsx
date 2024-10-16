import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Ieducation, Iemployees } from "../employees-crud/EmployeesCrud";
import AddSkills, { Iskill } from "../add-skills/AddSkills";

function Skills() {
    let [search, setSearch] = useSearchParams();

    debugger;
    let [index, setIndex] = useState<number>(0);
    let [skillIndex, setskillIndex] = useState<number>(0);

    let[skillData,setSkillData] = useState<Array<Iskill>>([]);
    
    // Array For Employees Data
    let [EmployeesArray, setEmployeesArray] = useState<Array<Iemployees>>([]);

    // Variable for getting Employees Education
    let [skillId, setskillId] = useState(0);
    let [level,setLevel] = useState<number> ();

    let skillIde = Number(search.get('sklId'));
    let employeeIde = Number(search.get('empId'));
    let idde=Number(search.get('idd'));
    useEffect(() => {
        if (localStorage.getItem('EmployeesData') != null) {
            const employees = JSON.parse(localStorage.EmployeesData);
            setEmployeesArray(employees);
            employees.map((em: Iemployees,i :any) => {
             if(em.id==employeeIde)
             {
                setIndex(i);
                em.skills.map((sk:IoneEmployeeSkill,k) => {
                    if(sk.id==skillIde)
                    {
                        setskillIndex(k);
                        setskillId(sk.id);
                        setLevel(sk.level);
                    }
                })
             }
            });
        }
        if (localStorage.getItem('skillData') != null) {
            const employees = JSON.parse(localStorage.skillData);
            setSkillData(employees);
        }
    }, []);


    // function for Saving and Editing Employees Education  data
    const addOneEmployeeSkill = () => {
        if (level && skillId) {
            if (idde==0) {
                EmployeesArray[index].skills.push({ id: skillId, level: level });
            }
            if(idde==1)
            {
                EmployeesArray[index].skills[skillIndex!].id=skillId;
                EmployeesArray[index].skills[skillIndex].level = level;
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
                    <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={skillId} onChange={(e) => {setskillId(parseInt(e.target.value))}}>
                    <option selected>Select Skill</option>
                    {skillData.map((sk:Iskill) => (
                        <option value={sk.id}>{sk.name}</option>
                    ))}
                    </select>
                    <select className="form-select form-select-lg mb-3" aria-label="Large select example" value={level} onChange={(e) => {setLevel(parseInt(e.target.value))}}>
                        <option selected>Select Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                    <div className="col-md-2 mx-auto">
                        <Link to="/"><button type="button" className="btn btn-success" onClick={addOneEmployeeSkill}>SUBMIT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Skills;
export interface IoneEmployeeSkill {
    level:number;
    id:number;
} 