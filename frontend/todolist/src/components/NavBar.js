import { NavLink,  } from "react-router-dom"
import React, {useState} from 'react'
import './NavBar.css'
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    
        <nav>
          <NavLink to="/" className="title">CRUD BASICS</NavLink>
          <div className="menu"  onClick={()=>{
            setMenuOpen(!menuOpen)
          }}>
            <span></span>
            <span></span>
            <span></span>
            
          </div>
          <ul className={menuOpen ? "open": ""}>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
       </nav>
 
   

  )
}
export default NavBar