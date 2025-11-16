import React, { useState } from 'react'
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")

    const handleRegister = async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/register",{userid,password});
        navigate("/")
    }


  return (
    <div>
       <input type='text' value={userid} placeholder='Set Your User ID' onChange={(e)=>setUserid(e.target.value)}/>
       <input type='password' value={password} placeholder='Set Your Password' onChange={(e)=>setPassword(e.target.value)}/>
       <button onClick={handleRegister}>Register</button>
       <p>Already Have an account</p><Link to="/">LogIn</Link>
    </div>
  )
}

export default Register
