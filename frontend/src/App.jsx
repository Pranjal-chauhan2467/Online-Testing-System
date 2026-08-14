import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar.jsx";
import Footer from "./pages/Footer.jsx";
function App() {
   return(
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
   );
  }
export default App
