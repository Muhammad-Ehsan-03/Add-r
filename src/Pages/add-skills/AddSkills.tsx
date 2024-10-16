import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function AddSkills() {
    
    let [skillName, setSkillName] = useState('');

    let [skillId, setSkillId] = useState<number>();
    let skillIdd = useRef(0);

    let [search, setSearch] = useSearchParams();

    // Array For Employees Data
    let [skillsData, setSkillsData] = useState<Array<Iskill>>([]);

    let skId = Number(search.get('idd'));

    useEffect(() => {
        //  Fetching data of Skill
        if (localStorage.getItem('skillData') != null) {
            console.log('page Refresh');
            const oldData = JSON.parse(localStorage.skillData);
            setSkillsData(oldData);
            oldData.map((skill: Iskill) => {
                if (skId == skill.id) {
                    console.log("skillId = ",skill.id)
                    setSkillId(skill.id);
                    setSkillName(skill.name);
                    console.log("skill Name" ,skillName)
                }
            })
        }
        if (localStorage.getItem('skillIde')) {
            skillIdd.current = parseInt(localStorage.skillIde);
        }
        else {
            localStorage.setItem('skillIde', '0');
        }

        if (skId == 0) {
            skillIdd.current++;
            setSkillId(skillIdd.current);
            localStorage.setItem('skillIde', JSON.stringify(skillIdd.current));
        }
    }, []);

     // function for Saving and Editing Department data

     const addskill = () => {

        if (skId == 0) {
            if (skillId && skillName) {
                skillsData.push(
                    {
                        id: skillId,
                        name:skillName,
                    }
                )
                const newData = [...skillsData];
                setSkillsData(newData);
                localStorage.setItem('skillData', JSON.stringify(newData));
            }
        }
        if (skId > 0) {
            let index;
            skillsData.map((s, i) => {
                if (s.id == skillId) {
                    index = i;
                }
            }
            )
            skillsData[index!].name = skillName;
            const newData = [...skillsData];
            setSkillsData(newData);
            localStorage.setItem('skillData', JSON.stringify(newData));
        }
    }
    return (
        <div className="">
            {/* Creating Input Field for Getting Employees Data*/}
            < div className="department-input-field">
                <div className="Header">
                    <h4>Update Skills</h4>
                </div>
                <div className="input-field skill-name">Skill <p> Name</p><span>*</span><input type="text" className="form-control" placeholder="Enter Skill Name" value={skillName} onChange={(e: any) => { setSkillName(e.target.value) }} /></div>
                <div className="col-md-2 mx-auto">
                    <Link to="/print-skills"> <button type="button" className="btn btn-success" onClick={addskill}>SUBMIT</button></Link></div>
            </div>
        </div>
    )
}
export default AddSkills;
export interface Iskill {
    id: number;
    name: string;
}

