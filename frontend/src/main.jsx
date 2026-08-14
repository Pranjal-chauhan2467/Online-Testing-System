import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Exam from './pages/Exam.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import AdminDashboard from "./pages/AdminDashboard";
import ViewQuestion from './pages/ViewQuestion.jsx';
import Result from './pages/Result.jsx'
import App from './App.jsx'
import AddQuestion from './pages/AddQuestion.jsx';
import axios from "axios";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import ViewUser from "./pages/ViewUser";
axios.defaults.withCredentials = true;

const router=createBrowserRouter([
    {
        path:"/",
       element:<App/>,
       children:[
        {
            index:true,
            element:<Home/>,
        },
        {
          path:"register",
          element:<Register/>  
        },
        {
           path:"login",
           element:<Login/>
        },
        {
            path:"learner-dashboard",
            element:(
            <ProtectedRoutes role="Learner">
               <StudentDashboard/>
            </ProtectedRoutes>)
        },
        {
            path:"admin-dashboard",
            element:(
            <ProtectedRoutes role="Admin">
              <AdminDashboard/>
           </ProtectedRoutes>)
        },
        {
            path:"add-question",
            element:(
              <ProtectedRoutes role="Admin">
               <AddQuestion/>
            </ProtectedRoutes>)
        },
        {
            path:"view-question",
            element:(
             <ProtectedRoutes role="Admin">
              <ViewQuestion/>
            </ProtectedRoutes>)
        },
        {
            path:"exam",
            element:(
                <ProtectedRoutes role="Learner">
                    <Exam />
                </ProtectedRoutes>
            )
        },
        {
            path:"result",
            element: (
                <ProtectedRoutes role="Learner">
                    <Result />
                </ProtectedRoutes>
            )
        },
           {
               path: "users",
              element: (
             <ProtectedRoutes role="Admin">
               <ViewUser/>
            </ProtectedRoutes>
         )
        }
       ]
    }
]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
