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
import Skills from './Pages/skills/Skills';
import AddSkills from './Pages/add-skills/AddSkills';
import PrintSkills from './Pages/print-skills/PrintSkills';
import PrintOneEmployeeSkills from './Pages/print-one-employee-skills/PrintOneEmployeeSkills';
import PrintUser from './Pages/print-user/PrintUser';
import Todo from './Pages/todo/todo';
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
            <Route path='skills' element={<Skills/>}></Route>
            <Route path='add-skills' element={<AddSkills/>}></Route>
            <Route path='print-skills' element={<PrintSkills/>}></Route>
            <Route path='skills' element={<Skills/>}></Route>
            <Route path='print-one-employee-skills' element={<PrintOneEmployeeSkills/>}></Route>
            <Route path='print-user' element={<PrintUser/>}></Route>
            <Route path='todo' element={<Todo/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
