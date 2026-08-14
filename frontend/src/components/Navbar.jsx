import { useState,useEffect } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import "./Navbar.css";
import axios from'axios';
const API_URL = import.meta.env.VITE_API_URL;
function Navbar(){
  const [user,setUser]=useState(null)
  const navigate=useNavigate()
  const location=useLocation()
  useEffect(()=>{
    getUser();
  },[location.pathname]);
  const getUser=async()=>{
    try{
     const response=await axios.get(`${API_URL}/online/checksession/`);

    if(response.data.logged_in){
        setUser({role:response.data.role})
    }
    else{
      setUser(null)
    }
  }
    catch(error){
      setUser(null);
      }
    };
    const logout=async()=>{
      try{
       const response= await axios.post(`${API_URL}/online/logout/`)
       setUser(null)
       navigate("/login");
    }
      catch(error){
        alert("logout failed")
      }
    };
    return(
        <nav className="navbar">
             <div className="logo">
                Online Exam
            </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {"|"}
          {!user && (
            <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            </>
          )}
               {user && user.role === "Learner" && (
                <>
                    <Link to="/learner-dashboard">
                        Dashboard
                    </Link>
                      {"|"}
                    <Link to="exam">
                        Exam
                    </Link>
                        {"|"}
                    <Link to="result">
                        Result
                    </Link>
                         {"|"}
                    <button onClick={logout}>
                       logout
                    </button>
                  </>) }
                  {user && user.role === "Admin" && (
                  <>
                    <Link to="/admin-dashboard">
                        Dashboard
                    </Link>
                     {"|"}
                    <Link to="/users">
                         Users
                      </Link>
                          {"|"}
                    <Link to="/add-question">
                        AddQuestion
                    </Link>
                           {"|"}
                    <Link to="/view-question">
                        ViewQuestion
                    </Link>
                          {"|"}
                    <button onClick={logout}>
                       logout
                    </button>
                  </>
                  )}
            </div>
          </nav>
        );
      }
export default Navbar;