import React, {useEffect, useState} from 'react';
import './Home.scss'
import  { GetAllEmployees, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId, GetEmployeesBySkillId, GetEmployeesByLevelId}  from '../../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ModalHomeSkills from '../Modals/ModalHomeSkills.jsx';
import ModalSearchEmployees from '../Modals/ModalSearchEmployeesBySkill.jsx';
import ModalSearchEmployeesExpert from '../Modals/ModalSearchEmployeesByExpertise.jsx';
import { useSelector } from 'react-redux'
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'

const dataToSearch = {
  skillId: 0,
  LevelId: 0
}

const Home = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
  const [showModal, setShowModal] = useState(false)
  const [showModalSearchEmployees, setshowModalSearchEmployees] = useState(false)
  const [showModalSearchEmployeesExpert, setShowModalSearchEmployeesExpert] = useState(false)
  const [ employees, setEmployees ] = useState( [] )
  const [ skills, setSkills ] = useState( [] )
  const [skillToShow, setSkillToShow] = useState('')
  const [ expertises, setExpertises ] = useState( [] )
  const [skillsbyemployee, setskillsbyemployee] = useState([])
  const [employeeWithskill, setEmployee] = useState([])
  const [employeesSearch, setemployeesSearch] = useState([])
  const [employeesSearchSkillLevel, setemployeesSearchSkillLevel] = useState(dataToSearch)
  // For every search
  const [search, setSearch] = useState('');

  const sendDataEmployee = async (employeedata) => {
    const response = await getSkillsByEmployeeId(employeedata, token);
    if (response != null){
      setskillsbyemployee(response)
    } else {
      //No skills to Show
      setskillsbyemployee([])
    }
    setEmployee(employeedata)
    
    console.log(response)
    setShowModal(true)
  }

  const getSkillsByEmployeeId = async (employeedata, token) => {
    const response = await GetSkillsByEmployeeId(employeedata, token);
    console.log(response)
    return response
  }
  const { user, isSuccess} = useSelector((state) => state.auth)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect ( () => {
    if (isSuccess){
      getAllEmployees(token)
      getAllSkills(token)
      getAllExpertiseLevel(token)
      console.log(user, isSuccess)
    }


  }, [])
  
  const getAllEmployees = async (token) => {
    const response = await GetAllEmployees(token)
    setEmployees(response)
  }
  const getAllSkills = async (token) => {
    const response = await GetAllSkills(token)
    setSkills(response)
  }
  const getAllExpertiseLevel = async (token) => {
    const response = await GetAllExpertiseLevel(token)
    setExpertises(response)
  }
  const handleChange = (event) =>{ 
    setSearch(event.target.value); 
  }

  const onHandleSelectSkill  = async (skill, token) => {
    setemployeesSearchSkillLevel({...employeesSearchSkillLevel, ["skillId"]: skill.id})
    console.log(employeesSearchSkillLevel)
    const res = await GetEmployeesBySkillId(skill.id, token)
    if (res != null){
      setemployeesSearch(res)
      setshowModalSearchEmployees(true)
      setSkillToShow(skill.skill)
    } else {
      await Toast.fire({
        title: `🤨 This skill does not have employees assigned`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })
    } 
  }
  const handleSelectLevel = async (event, token) => {
    const value = event.target.value
    console.log(value)
    const res = await GetEmployeesByLevelId(value, token)
    if (res != null){
      setemployeesSearch(res)
      setShowModalSearchEmployeesExpert(true)
      //setSkillToShow(skill)
    } else {
      await Toast.fire({
        title: `🤨 This Expertise Level has not been assigned`,
        icon: 'error',
        timer: 1500,
        position: "top"
      })
    } 

  }

  const filteredEmployees = 
    employees.filter(employee => 
    employee.firstName.toLowerCase().includes(search.toLowerCase())
    )

    return (
      <motion.div
        initial={{opacity: 0, x: 100 }}
        animate={{opacity: 1, x: 0 }}
        exit={{opacity: 0, x: -100 }}
        transition={{duration: 0.7}}
      >{ isSuccess ? (
          <Container>
          <Row>
            <Col>
              <FormGroup className='formgroup1'>
                <Label >Search by Name</Label>
                <Form.Control  id="Email" placeholder="Search Employees" onChange={(event) => handleChange(event)}/>
              </FormGroup>
              <FormGroup>
                <Label >Search by Expert Level</Label>
                <Form.Select type="select" name="select" onChange={(e) => handleSelectLevel(e, token)}>
                  { expertises.map( (expertise) =>(
                    <option value={expertise.id} onChange={() => handleSelectLevel(expertise, token)}>{expertise.id}. {expertise.name}</option> 
                  ))}
                </Form.Select>
              </FormGroup>             
            </Col>
            <Col>
              <FormGroup className='formgroup1'>
                <Label>Search by Skills</Label>
                <Form.Select className='inputSkills' type="select" name="selectMulti" id="SelectMul" multiple size={5}>
                  { skills.map( (skill) =>(
                        <option value={skill.id} onClick={() => onHandleSelectSkill(skill, token)}>{skill.id}. {skill.skill}</option> 
                      ))}                
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 0 }}>
              <Button color="warning" size="sm"> Search Employees </Button>  
            </Col>
                    
          </Row>
          <Row>
            <FormGroup className='formgroup1'>
              <Label >Total Found: {employees.length} Results {' '}
                <Button color="secondary" size="sm">
                  Export to Excel 
                </Button>
              </Label>
                <Table className='table table-striped' bordered size="sm">
                  <thead className='text-dark'>
                    <tr>
                      <th> # </th>
                      <th>Name</th>
                      <th>Date of Joining</th>
                      <th>Designation</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { filteredEmployees.map( (employee) =>(
                        <tr key={employee.id}>
                          <td> {employee.id}</td>
                          <td> {employee.firstName + " "+employee.lastName} </td>
                          <td> {employee.doj.slice(0, 10)} </td>
                          <td> {employee.designation} </td>
                          <td> {employee.email} </td>
                          <td>
                          <Button color="info" size="sm" onClick={ () => sendDataEmployee(employee) }>View Skills</Button> 
                          </td>
                        </tr>
                    )) }
                  </tbody>
                </Table>
            </FormGroup>
          </Row>
          <ModalHomeSkills 
            showModal = {showModal} 
            setShowModal = {setShowModal}
            skillstoShow = {skillsbyemployee}
          />
          <ModalSearchEmployees
            showModal = {showModalSearchEmployees}
            setShowModal = {setshowModalSearchEmployees}
            employees = {employeesSearch}
            skill = {skillToShow}
          />
          <ModalSearchEmployeesExpert
            showModal = {showModalSearchEmployeesExpert}
            setShowModal = {setShowModalSearchEmployeesExpert}
            employees = {employeesSearch}
          />
        </Container>
      ) : (
          <UnAuthorized/>      
      )}</motion.div>
    );

}
export default Home;