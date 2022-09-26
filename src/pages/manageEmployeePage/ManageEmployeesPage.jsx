import React, {useEffect, useState} from 'react';
import './ManageEmployeePage.scss';
import  { GetAllEmployees,DeleteEmployee, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId }  from '../../httpService.js';
import { Container, Row} from 'reactstrap';
import { Button, FormGroup, Input} from 'reactstrap';
import ModalEmployeeSkills from '../Modals/ModalEmployeeSkills.jsx';
import ModalAddEmployee from '../Modals/ModalAddEmployee.jsx';
import ModalAssignSkill from '../Modals/ModalAssignSkill.jsx';
import ModalEditEmployee from '../Modals/ModalEditEmployee.jsx';
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
const ManageEmployeesPage = () => {

  //UseState to handle skills and expertises
  const [ skills, setSkills ] = useState( [] )
  const [ expertises, setExpertises ] = useState( [] )

  //UseSetates to handle the Modals
  const [showModalskills, setShowModalskills] = useState(false)
  const [showModalEditEmployee, setshowModalEditEmployee] = useState(false)
  const [showModalAddEmployee, setshowModalAddEmployee] = useState(false)
  const [showModalAddskills, setshowModalAddskills] = useState(false)

  const [skillsbyemployee, setskillsbyemployee] = useState([])
  const [ employees, setEmployees ] = useState( [] )
  const [employeeWithskill, setEmployee] = useState([])
  // The state from Redux
  const { isSuccess } = useSelector((state) => state.auth)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect ( () => {
    if (isSuccess){
      getAllEmployees(token)
      getAllSkills(token)
      getAllExpertiseLevel(token)
    }
  }, [])

  const getAllEmployees = async (token) => {
    const response = await GetAllEmployees(token);
    setEmployees(response);
    console.log(response);
  }
  const getAllSkills = async (token) => {
    const response = await GetAllSkills(token)
    setSkills(response);
    
  }
  const getAllExpertiseLevel = async (token) => {
    const response = await GetAllExpertiseLevel(token)
    setExpertises(response)
  }

  const deleteEmployee = async (id, token) => {
    var responseConfirm = window.confirm("Do you really want to delete the Employee?")
    if(!responseConfirm){
      return;
    }
    const response = await DeleteEmployee(id, token);
    if (response.status === 200){
      let data = employees.filter(data => data.id !== id)
      console.log(data)
      //getAllEmployees();
      setEmployees(data)
    }
}



  const getSkillsByEmployeeId = async (employeedata, token) => {
    const response = await GetSkillsByEmployeeId(employeedata, token);
    return(response);
  }

    //Functions to launchModals show skills
  const sendDataEmployee = async (employeedata, token) => {
    const response =  await getSkillsByEmployeeId(employeedata, token);
    console.log(response)
    if (response != null)
    { 
      setskillsbyemployee(response)
    } else {
      setskillsbyemployee([])
    }
    setEmployee(employeedata)
    setShowModalskills(true)
  }

  //Function to launch Add employee modal
  const geDataToLaunchModal = () => {
    setshowModalAddEmployee(true)
    console.log('result');
  }

  //Function to launch Addskills modal
  const getDataToLaunchAddSkillModal = (employeedata) => {
    setshowModalAddskills(true)
    setEmployee(employeedata)
  }

  //Function to launch edit Employee Modal
  const getDataTolaunchModalEditEmployee = (employeeData) => {
    setshowModalEditEmployee(true)
    employeeData.doj = employeeData.doj.slice(0, 10);
    setEmployee(employeeData)
  }

  return  (
    <motion.div
      initial={{opacity: 0, x: 100 }}
      animate={{opacity: 1, x: 0 }}
      exit={{opacity: 0, x: -100 }}
      transition={{duration: 0.7}}
    
    >{ isSuccess ? (
      <Container>
      <Row>
        <FormGroup>
          <Input className='AddEmployee' type="select" id="exampleSelect" onClick={ () => geDataToLaunchModal() }>
            <option>Click to Add Employee</option>
          </Input>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
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
              { employees.map( (employee) =>(
                <tr key={employee.id}>
                  <td> {employee.id}</td>
                  <td> {employee.firstName + " "+employee.lastName} </td>
                  <td> {employee.doj.slice(0, 10)} </td>
                  <td> {employee.designation} </td>
                  <td> {employee.email} </td>
                  <td>

                      {/* Pass Employee to modal */}
                    <Button color="info" size="sm" onClick={ () => sendDataEmployee(employee, token) }>View Skills</Button> {' '}
                    <Button color="warning" size="sm" onClick={ () => getDataToLaunchAddSkillModal(employee)}>Assign Skills</Button> {' '}
                    <Button color="success" size="sm" onClick={ () => getDataTolaunchModalEditEmployee(employee)}>Edit</Button>{' '}
                    <Button color="danger" size="sm" onClick={ () => deleteEmployee(employee.id, token) }>Delete</Button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        </FormGroup>
      </Row>
      <ModalEmployeeSkills 
          showModal = {showModalskills} 
          setShowModal = {setShowModalskills}
          skillstoShow = {skillsbyemployee}
          setSkillsToshow = {setskillsbyemployee}
          employee = {employeeWithskill}
        />  
      <ModalAddEmployee
        showModalAddEmployee = {showModalAddEmployee}
        setshowModalAddEmployee = {setshowModalAddEmployee}
        getAllEmployees = {getAllEmployees}
       /> 
       <ModalAssignSkill
          employee = {employeeWithskill}
          showModalAddskills = {showModalAddskills}
          setshowModalAddskills = { setshowModalAddskills }
          expertises = {expertises}      
          skills = {skills}
       />  
       <ModalEditEmployee
       showModalEditEmployee = {showModalEditEmployee}
       setshowModalEditEmployee = {setshowModalEditEmployee}
       employeeWithSkills	 = {employeeWithskill}
       getAllEmployees = {getAllEmployees}
       />
    </Container>
    ) : (
      <UnAuthorized/>
    )}</motion.div>
  )
}

export default ManageEmployeesPage