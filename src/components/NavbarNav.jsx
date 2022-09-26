import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess } = useSelector((state) => state.auth)
  
  const logOut = (e) => {
    e.preventDefault();
    console.log('click')
    dispatch(logout())
    localStorage.removeItem('token')
    navigate("/")
  }
  return (
    <motion.div
      initial={{opacity: 0, x: 100 }}
      animate={{opacity: 1, x: 0 }}
      exit={{opacity: 0, x: -100 }}
      transition={{duration: 0.7}}
    >
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand href="/home"><span className="navbar-toggler-icon"></span></Navbar.Brand>
          <Navbar.Brand >Employee Skills Management</Navbar.Brand>{' '}        
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <Nav >
              <NavDropdown title="Admin" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={ (e) => logOut(e) }>{isSuccess ? 'logout' : 'login'}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>

  )
}

export default NavBar;