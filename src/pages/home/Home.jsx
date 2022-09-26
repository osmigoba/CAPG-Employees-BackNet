import React, {useEffect, useState} from 'react';
import './Home.scss'
import  { GetAllEmployees, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId}  from '../../httpService.js';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import ModalHomeSkills from '../Modals/ModalHomeSkills.jsx';
import Loading from '../loading/Loading.js';
import { useSelector } from 'react-redux'
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import { motion } from "framer-motion"
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [ employees, setEmployees ] = useState( [] )
  const [ filtersemployees, setFilterEmployees ] = useState( [] )
  const [ skills, setSkills ] = useState( [] )
  const [ expertises, setExpertises ] = useState( [] )
  const [loading, setLoading] = useState(false);
  const [skillsbyemployee, setskillsbyemployee] = useState([])
  const [employeeWithskill, setEmployee] = useState([])

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
          {loading && <Loading />}
          <Row>
            <Col>

                <FormGroup className='formgroup1'>
                  <Label >Search by Name</Label>
                  <Input  id="Email" placeholder="Search Employees" onChange={(event) => handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label >Search by Expert Level</Label>
                  <Input type="select" name="select" id="SelectExpert">
                    { expertises.map( (expertise) =>(
                      <option id={expertise.id}>{expertise.id}. {expertise.name}</option> 
                    ))}
                  </Input>
                </FormGroup>             

            </Col>
            <Col>
              <FormGroup className='formgroup1'>
                <Label>Search by Skills</Label>
                <Input className='inputSkills' type="select" name="selectMulti" id="SelectMul" multiple size={5}>
                  { skills.map( (skill) =>(
                        <option id={skill.id}>{skill.id}. {skill.skill}</option> 
                      ))}                
                </Input>
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
        </Container>
      ) : (
          <UnAuthorized/>      
      )}</motion.div>
    );

}
export default Home;