import React, { useState } from 'react'
import axios from 'axios';
import "../css/Register.css";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
const  UserRegister=()=> {
  const [username, setUsername] = useState('');
  const[email,setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate=useNavigate();
const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/user/register',{username,email,password,phoneNumber})
    .then(res=> {
        // console.log(res);
       if(res.data.registered){
            navigate('/Home');
            
       }
       console.log(res);

    })
    .catch(err=> console.log(err));
}
  return (
    <div className="student-form-container">
        <form className='student-form' onSubmit={handleSubmit}>
         <h2>Register</h2>
        <div className='form-group'>
            <label htmlFor="username">UserName : </label>
            <input type="text" id='username' name='username'
            onChange={(e)=> setUsername(e.target.value)} required/>
        </div>
        <div className='form-group'>
            <label htmlFor="Email">Email : </label>
            <input type="text" id='Email' name='Email'
            onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className='form-group'>
            <label htmlFor="password">Password : </label>
            <input type="text" id='password' name='password' 
            onChange={(e)=> setPassword(e.target.value)} required/>
        </div>
        <div className='form-group'>
            <label htmlFor="phoneNumber">PhoneNumber : </label>
            <input type="text" id='phoneNumber' name='phoneNumber' 
            onChange={(e)=> setPhoneNumber(e.target.value)} required/>
        </div>
        <button type='submit'>Register</button>
        <br /><br />
        <div className='login'>
            <Link to="/login" className='navbar-link'>Login Now</Link>
        </div>
        
        </form>
        </div>
        
  )
}

export default UserRegister