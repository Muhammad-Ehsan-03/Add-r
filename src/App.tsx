import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Department from './Pages/department/Department';
import EmployessCrud from './Pages/employees-crud/EmployeesCrud';
import EmployeeDetails from './Pages/employeeDetails/EmployeeDetails';
import Education from './Pages/education/Education';
import Layout from './Pages/layout/Layout';
import AddEmploy from './Pages/add-employee/AddEmploy';
import Add_Education from './Pages/add-education/Add_Education';
import AddDepartment from './Pages/add-department/AddDepartment';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path='employees-crud' element={<EmployessCrud/>}></Route>
            <Route path='employeeDetails' element={<EmployeeDetails />}></Route>
            <Route path='education' element={<Education/>}></Route>
            <Route path='add-employee' element={<AddEmploy/>}></Route>
            <Route path='department' element={<Department />}></Route>
            <Route path='add-education' element={<Add_Education/>}></Route>
            <Route path='add-department' element={<AddDepartment/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
