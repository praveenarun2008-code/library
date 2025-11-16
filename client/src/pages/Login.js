import React, { useState } from 'react'
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin = async (e)=>{
        e.preventDefault();
        const res =await axios.post("http://localhost:8000/login",{userid,password});
        if(res.data.role==="admin"){
          navigate("/admin")
        }
        else{
          navigate("/user")
        }
    }

  return (
    <div>
       <input type='text' value={userid} placeholder='Enter Your User ID' onChange={(e)=>setUserid(e.target.value)}/>
       <input type='password' value={password} placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
       <button onClick={handleLogin}>Login</button>
       <p>Did not Have an account</p><Link to="/register">Create an Account`</Link>
    </div>
  )
}

export default Login
