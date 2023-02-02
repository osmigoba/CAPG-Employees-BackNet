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
    <Routes>
    <Route path='/'  exact="true" element={<Login />}></Route>
    </Routes>
      
      <Container fluid={true} className='containerMain'>
        <Row className='mainRow'>
          <Col sm={3} md={3} lg={2} className='mainCols'>
            <Sidebar />
          </Col>
          <Col sm={9} md={9} lg={10} className='mainCols'>
              <NavbarNav />
              <Routes>
                {/* <Route path='/'  exact="true" element={<Login />}></Route> */}
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
