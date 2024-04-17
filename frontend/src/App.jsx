import React, { useState ,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserLogin from './Components/UserLogin'
import UserRegister from './Components/UserRegister'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import axios from 'axios'
import Logout from './Components/Logout'
import AboutPage from './Components/About_Page'
import Tools from './Components/Tools'
import RichTextNotepad from './Components/Reatime_text'

 
function App() {
  const [role,setRole]=useState('');
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/verify')
    .then(res=>{
      if(res.data.login){
        setRole(res.data.role);
      }
      else{
        setRole('');
      }
      console.log(res);
    }).catch(err=> console.log(err));
  },[])
  
  return (
    <BrowserRouter>
    <Navbar  role={role}/>
    
    <Routes>
    <Route path='/' element={<Home />}/>
   
    <Route path='/login' element={<UserLogin setRoleVar={setRole} />}/>
    <Route path='/register' element={<UserRegister />}/>
    <Route path='/logout' element={<Logout setRole={setRole}/>}/>
    <Route path='/AboutPage' element={<AboutPage/>}/>
    <Route path='/Tools' element={<Tools/>}/>
    <Route path='/Real_time' element={<RichTextNotepad></RichTextNotepad>}/>
    
    </Routes>

    
    </BrowserRouter>
  )
}

export default App