import {useState,useEffect} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function ProtectedRoutes({role,children}){
      const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(()=>{
        const checksession=async()=>{
          try{
            const response=await axios.get(`${API_URL}/online/checksession/`);
            
            if(response.data.logged_in){
                setUser(response.data);
            }
        }
         catch(error){
            setUser(null)
         }
         setLoading(false)
        };
        checksession();
     },[]);

     if(loading){
        return(
          <h2>checking login...</h2>
        )
     }
    // Not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }
    // Not correct role
      if (user.role !== role) {
        return <Navigate to="/" />;
    }
    return children;
}
export default ProtectedRoutes;