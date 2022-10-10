import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';
import NavbarNav from './components/NavbarNav'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/Sidebar';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ManageEmployeesPage from './pages/manageEmployeePage/ManageEmployeesPage'
import ManageSkillsPage from './pages/manageSkillPage/ManageSkillsPage'
function App() {
  return (
    <BrowserRouter>
      <Container fluid className='containerMain'>
        <Row className='rows' fluid>
          <Col sm={3} md={3} lg={2} className='cols1'>
            <Sidebar />
          </Col>
          <Col sm={9} md={9} lg={10} className='cols'>
              <NavbarNav />
              <Routes>
                <Route path='/'  exact="true" element={<Login />}></Route>
                <Route path='/home'  exact="true" element={<Home />}></Route>
                <Route path='/employee/manage' exact="true" element={<ManageEmployeesPage />}></Route>
                <Route path='/employee/skills' exact="true" element={<ManageSkillsPage />}></Route>
              </Routes>
         
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
