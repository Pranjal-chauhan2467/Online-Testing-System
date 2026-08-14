import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom";
import "./Register.css";
const API_URL = import.meta.env.VITE_API_URL;
function Register() {
    const [formdata,setFormData]=useState({
        full_name:"",
        username:"",
        email:"",
        password:""
    });
    const [error,setError]=useState("");
    const navigate=useNavigate()

    function handleChange(event){
        const {name,value}=event.target
        setFormData({
          ...formdata,
          [name]:value  
        });
    }

    async function registerUser(event){
        event.preventDefault();
        try{
            const response=await axios.post(`${API_URL}/online/register/`,formdata);
            
           alert(response.data.message);
          navigate("/login")
        }
        catch(error){
             setError(error.response.data.message)
        }
        setFormData({ 
        full_name:"",
        username:"",
        email:"",
        password:""    
        });
    }
    return(
       <div className="register-page">
          <div className="register-box">
           <h1>Register</h1>
          <form onSubmit={registerUser}>
           <label>Full Name</label>
          <input 
           type="text"
           name="full_name"
           onChange={handleChange}
           placeholder="fullname"
           value={formdata.full_name}
           required
            />
        <br />
        <label>Username</label>
        <input 
           type="text"
           name="username"
           placeholder="Username"
           onChange={handleChange}
           value={formdata.username}
             required />
        <br />
        <label>Email</label>
        <input 
           type="email"
           name="email"
           onChange={handleChange}
           placeholder="email"
           value={formdata.email}
            required
            />
         <br />
        <label>Password</label>
        <input 
           type="password"
           name="password"
           onChange={handleChange}
            placeholder="Password"
           value={formdata.password}
            required
            />
        <br />
         {error&&(
               <p className="error-message">
                  {error}
                   </p>
                   )
                  }
        <button type="submit">
           Submit
        </button>
        </form>
              <p>
                   Already have an account?
                    <Link to="/login"> Login</Link>
                </p>
          </div>

        </div>
    )
}

export default Register;