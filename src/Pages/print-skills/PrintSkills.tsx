import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Iskill } from '../add-skills/AddSkills';
function PrintSkills() {

    // Array For Employees Data
    let [skillsData, setSkillsData] = useState<Array<Iskill>>([]);

    // Get Data From localstorage

    useEffect(() => {
        //  Fetching data of Department
        if (localStorage.getItem('skillData') != null) {
            console.log('page Refresh');
            const oldData = JSON.parse(localStorage.skillData);
            setSkillsData(oldData);
        }
        else {
            console.log('page Refresh But Data Empty');
        }
    }, []);
    //  Function for Delete Employee Data
    const deleteDepartment = (e: any) => {
        let index;
        skillsData.map((s, i) => {
            if (s.id == e) {
                index = i;
            }
        }
        )
        skillsData.splice(index!, 1);
        const newData = [...skillsData];
        setSkillsData(newData);
        localStorage.setItem('skillData', JSON.stringify(newData));
    }
    return (
        <div>
            {/* Space Between header and body */}
            <div className="space"></div>

            {/* All Employees List */}

            <div className="department-list">
                <div className="employees List">
                    <div className="header-2 depatment-list">
                        <h4>Manage Skills</h4>
                        <div className="back-button">
                            <Link to={"/add-skills?idd=0"} style={{ textDecoration: 'none' }}> <button type="button" className="btn btn-success">Add</button></Link>
                        </div>
                        <div className="back-button">
                            <button type="button" className="btn btn-success"><i className="fa-solid fa-circle-arrow-left"> </i>Back</button>
                        </div>
                    </div>
                    <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Skill Name</th>
                                        <th scope="col">Action 1</th>
                                        <th scope="col">Action 2</th>
                                    </tr>
                                </thead>
                    {
                        skillsData.map((skill: Iskill) => (
                          
                                <tbody>
                                    <tr>
                                        <td>{skill.name}</td>
                                        <td className="text-danger"><i className="fa-solid fa-trash" onClick={() => { deleteDepartment(skill.id) }}></i></td>
                                        <td className="text-warning"><Link to={"/add-skills?idd=" + skill.id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                    </tr>
                                </tbody>
                        ))
                    }
                     </table>
                </div>
            </div>
        </div>
    )
}
export default PrintSkills;