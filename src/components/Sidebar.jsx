import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
    <ul>
        <li>
            <center>
            <img src="/capgemini.png" alt="Logo" className="brand-image" width="120" height="30"/>
            </center>
          {/* <hr width = "100%"></hr> */}
        
        </li>      
        <li>

            <NavLink to="/home" exact="true" className='text-dark  py-2 w-100 d-inline-block px-3' >Home</NavLink>
            {/* <hr width = "100%"></hr> */}
            
        </li>
        <li>

            <NavLink to="/employee/manage" exact="true" className='text-dark  py-2 w-100 d-inline-block px-3' >Manage Employees</NavLink>
            {/* <hr width = "100%"></hr> */}

        </li>
        <li>

            <NavLink to="/employee/skills" exact="true" className='text-dark  py-2 w-100 d-inline-block px-3' >Manage Skills</NavLink>

        </li>
        <li>

            <NavLink to="/employee/skills" exact="true" className='text-dark  py-2 w-100 d-inline-block px-3' >Manage Users</NavLink>

        </li>        
    </ul>
    </div>

  )
}

export default Sidebar