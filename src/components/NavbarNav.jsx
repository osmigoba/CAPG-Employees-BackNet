import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, FormGroup, Input} from 'reactstrap';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess } = useSelector((state) => state.auth)
  const logOut = (e) => {
    e.preventDefault();
    console.log('click')
    dispatch(logout())
    localStorage.removeItem('user')
    navigate("/")
  }
  return (
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
  );
}

export default NavBar;