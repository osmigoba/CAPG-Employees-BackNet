import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../features/auth/authSlice';
import { resetAll } from '../features/employees/employeesSlice'
import { resetAllSkills } from '../features/skills/skillsSlice'
import { resetAllLevels } from '../features/expertiseLevel/levelsSlice'
import { resetAllskillsOfEmployees } from '../features/skillsofEmployees/skillsofEmployeesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
import CapLogo from '../Capgemini-logo.jpg'
function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isSuccess } = useSelector((state) => state.auth)
  const { name } = useSelector((state) => state.auth)
  const logOut = async (e) => {
    e.preventDefault();

    if (isSuccess){
      let res = false;
      await Swal.fire({
        text: `Are you sure you want to logout?`,
        imageUrl: CapLogo,
        imageHeight: 150,
        imageWidth: 150,
        confirmButtonColor: "#0066FF",
        showCancelButton: true,
        showCloseButton: true,
        position: 'top'
      }).then(response => {
        if (response.isConfirmed){
          res = true;
        }
      })

      if (res){
        dispatch(resetAll())
        dispatch(resetAllSkills())
        dispatch(resetAllLevels())
        dispatch(resetAllskillsOfEmployees())
        dispatch(logout())
        
        localStorage.removeItem('token')
        navigate("/")
      }
    } else {
      navigate("/")
    }



  }

  const onHandlClick = () => {
    console.log("click")
  }
  return (<div>{isSuccess ? (
    <motion.div
      initial={{opacity: 0, x: 100 }}
      animate={{opacity: 1, x: 0 }}
      exit={{opacity: 0, x: -100 }}
      transition={{duration: 0.7}}
    >
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand><span className="navbar-toggler-icon" onClick={() => onHandlClick()}></span></Navbar.Brand>
        <Navbar.Brand >Employee Skills Management</Navbar.Brand>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />    
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <Nav >
              <NavDropdown title={name} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={ (e) => logOut(e) }>{isSuccess ? 'logout' : 'login'}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    </motion.div>    

  ): (null)}</div>)
}

export default NavBar;