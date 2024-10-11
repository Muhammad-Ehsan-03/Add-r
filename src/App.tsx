import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Department from './Pages/department/Department';
import EmployeesCrud from './Pages/employees-crud/EmployeesCrud';
import EmployessCrud from './Pages/employees-crud/EmployeesCrud';
import Test from './Pages/test/Test';
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<EmployessCrud/>}>
         <Route path='test' element={<Test/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
