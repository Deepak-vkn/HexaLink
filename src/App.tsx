
import { Route, Routes } from 'react-router-dom';
import UserLogin from './Pages/User/login'
import UserRegister from './Pages/User/register'
import CompanyLogin from './Pages/Company/login'
import CompanyRegister from './Pages/Company/register'
import './index.css';

import Otp from './Components/otp';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<UserLogin/>}/>
    <Route path='/user-register' element={<UserRegister/>}/>
    <Route path='/company' element={<CompanyLogin/>}/>
    <Route path='/company-register' element={<CompanyRegister/>}/>
    <Route path='otp' element={<Otp/>}/>
    </Routes>
   
     
    </>
  )
}

export default App
