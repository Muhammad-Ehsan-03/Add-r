import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="div">
               {/*  Header of Department page  */}
               <div className="header">
                <div className="home_icon">
                    <i className="fa-solid fa-house-chimney"></i>
                </div>
                <div className="user_icon">
                    <i className="fa-solid fa-user"></i> <h5>Department Managment</h5>
                </div>
            </div>
            <div className="NaveBar">
                <div className="logo">
                    EMPLOYEES CRUD
                </div>
                <div className="links">
                   <Link to="" style={{ textDecoration: 'none' }}><span>Home</span></Link>
                    <Link to="employees-crud"style={{ textDecoration: 'none' }}><span>Employees List</span></Link>
                    <Link to="/department"style={{ textDecoration: 'none' }}><span>Department</span></Link>
                    <Link to="add-employee?id=0"style={{ textDecoration: 'none' }}><span>Add Employee</span></Link>
                    <Link to="print-skills?id=0"style={{ textDecoration: 'none' }}><span>Skills</span></Link>
                    <Link to="print-user"style={{ textDecoration: 'none' }}><span>Print Data</span></Link>
                </div>
            </div>
            <div className="body">
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default Layout;