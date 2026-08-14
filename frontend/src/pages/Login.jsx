import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css";
const API_URL = import.meta.env.VITE_API_URL;
function Login(){
     const [formdata,setFormData]=useState({
        username:"",
        password:""
     });
     const [error, setError] = useState("");
     const navigate=useNavigate();
     const handleChange=(event)=>{
        const {name,value}=event.target
        setFormData({
            ...formdata,
            [name]:value
        });
     };

     const handleSubmit=async(event)=>{
             event.preventDefault()
            try{
             await axios.post(`${API_URL}/online/login/`,formdata
             );
             const response = await axios.get(
                `${API_URL}/online/checksession/`
                );
                 if (response.data.logged_in) {
                   if (response.data.role === "Admin") {
                    navigate("/admin-dashboard");
                }  else {
                    navigate("/learner-dashboard");
                }
            } 
        }
            catch(error){
                setError(error.response.data.message);
         }
          setFormData({
             username:"",
            password:""
        });
     };

    return(
        <div className="login-page">
           <div className="login-box">
             <h1>Login</h1>

             <form onSubmit={handleSubmit}>
              <label>Username</label>
                <input 
                type="text"
                name="username"
                placeholder="Username"
                value={formdata.username}
                onChange={handleChange}
                 />
                <br />
             <label>Password</label>
                <input 
                type="text"
                name="password"
                value={formdata.password}
                placeholder="password"
                onChange={handleChange} 
                   />
                {error &&(
               <p className="error-message">
                  {error}
                   </p>
                   )}
                <button type="submit">
                    Submit
                </button>
            </form>
                <p>
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
export default Login;