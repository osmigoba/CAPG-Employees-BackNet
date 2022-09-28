import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
import CapLogo from '../Capgemini-logo.jpg'
function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess } = useSelector((state) => state.auth)
  
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
      console.log(res)
      if (res){
        dispatch(logout())
        localStorage.removeItem('token')
        navigate("/")
      }
    } else {
      navigate("/")
    }


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