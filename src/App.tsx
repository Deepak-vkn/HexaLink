
import { Route, Routes } from 'react-router-dom';

// user---------------------->
import UserLogin from './Pages/User/login'
import UserRegister from './Pages/User/register'
import Userhome from './Pages/User/userhome'
import UserLogged from './middleware/user/userlogged'
import Usermid from './middleware/user/userhome';


// company---------------------->
import CompanyLogin from './Pages/Company/login'
import CompanyRegister from './Pages/Company/register'
import Navbar from './Components/user/navbar';
import CompanyHome from './Pages/Company/company'
import CompanyLogged from './middleware/company/companyLogin'
import Companymid from './middleware/company/companyHome';
//import CompanyNav from './Components/company/companyNav'

//admin---------------------->
import AdminLogin from './Pages/Admin/login';
import AdminHome from './Pages/Admin/adminHome';
import AdminLogged from './middleware/admin/adminLogin'
import Adminmid from './middleware/admin/adminHome';




import './index.css';
import Otp from './Components/otp';

function App() {
  return (
    <>

    {/* <---------------user----------------> */}
    <Routes>
    <Route element={<UserLogged/>}>
    <Route path="/" element={<UserLogin />} />
    <Route path='/user-register' element={<UserRegister/>}/>
    </Route>

   <Route element={<Usermid />}>
        <Route path='/home' element={<Userhome />}/>
   </Route>
   <Route path='/nav' element={<Navbar/>}/>

     {/* <---------------user----------------> */}




         {/* <---------------company----------------> */}
         
         <Route element={<CompanyLogged/>}>

         <Route path='/company' element={<CompanyLogin/>}/>
         <Route path='/company-register' element={<CompanyRegister/>}/>
          </Route>

          <Route element={<Companymid/>}>
          <Route path='/company-home' element={<CompanyHome/>}/>
          </Route>

         

        {/* <---------------company----------------> */}



          {/* <---------------admin----------------> */}

  
        
          <Route element={<AdminLogged/>}>

          <Route path='/admin' element={<AdminLogin/>}/>
          </Route>


          <Route element={<Adminmid/>}>
          <Route path='/admin-home' element={<AdminHome/>}/>
          </Route>

     
        
          

          {/* <---------------admin----------------> */}

          <Route path='/otp' element={<Otp/>}/>
   
    </Routes>
   
     
    </>
  )
}

export default App
