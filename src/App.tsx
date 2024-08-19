
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/userRoutes'
import AdminRoutes from './routes/adminRoutes'
import CompanyRoutes from './routes/companyRoutes'
import './index.css';
import Profile from './Components/profile';

function App() {
  return (
    <>
    <Routes>
         <Route path='/profile' element={<Profile/>}/>
          <Route path="/*" element={<UserRoutes />} /> 
          <Route path="/admin/*" element={<AdminRoutes />} /> 
          <Route path="/company/*" element={<CompanyRoutes />} />  
         
    </Routes>
   
     
    </>
  )
}

export default App
