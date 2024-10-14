import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="div">
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="">Home</Link>
                    </li>
                    <li>
                        <Link to="employees-crud">Employees List</Link>
                    </li>
                    <li>
                    <Link to="/department">Department</Link>
                    </li>
                    <li>
                    <Link to="add-employee?id=0">Add Employee</Link>
                    </li>
                </ul>
            </div>
            <div className="body">
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default Layout;