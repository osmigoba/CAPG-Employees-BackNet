import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
const Sidebar = () => {
  const { isSuccess } = useSelector((state) => state.auth)
  return (<div>{isSuccess ? (    <motion.div 
    initial={{opacity: 0, x: 100 }}
    animate={{opacity: 1, x: 0 }}
    exit={{opacity: 0, x: -100 }}
    transition={{duration: 0.7}}
    className="sidebar bg-light">
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
    </ul>
  </motion.div>) : (null)}</div>)
}

export default Sidebar