import React, {useEffect, useState} from 'react';
import './ManageEmployeePage.scss';
import  { GetAllEmployees,DeleteEmployee, GetAllSkills, GetAllExpertiseLevel, GetSkillsByEmployeeId }  from '../../httpService.js';
import { Container, Row} from 'reactstrap';
import { Button, FormGroup, Input} from 'reactstrap';
import ModalEmployeeSkills from '../Modals/ModalEmployeeSkills.jsx';
import ModalAddEmployee from '../Modals/ModalAddEmployee.jsx';
import ModalAssignSkill from '../Modals/ModalAssignSkill.jsx';
import ModalEditEmployee from '../Modals/ModalEditEmployee.jsx';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  const { user, isSuccess } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect ( () => {
    if (!isSuccess){
      navigate("/") // Navigate to login  
    }
    getAllEmployees()
    getAllSkills()
    getAllExpertiseLevel()
  }, [])

  const getAllEmployees = async () => {
    const response = await GetAllEmployees();
    setEmployees(response.result);
    console.log(response.result);
  }

  const deleteEmployee = async (id) => {
    var responseConfirm = window.confirm("Do you really want to delete the Employee?")
    if(!responseConfirm){
      return;
    }
    const response = await DeleteEmployee(id);
    if (response.status === 200){
      let data = employees.filter(data => data.id !== id)
      console.log(data)
      //getAllEmployees();
      setEmployees(data)
    }
}
  const getAllSkills = async () => {
    const response = await GetAllSkills()
    setSkills(response.result);
    
  }
  const getAllExpertiseLevel = async () => {
    const response = await GetAllExpertiseLevel()
    setExpertises(response.result)
  }

  const getSkillsByEmployeeId = async (employeedata) => {
    const response = await GetSkillsByEmployeeId(employeedata);
    return(response.result);
  }

    //Functions to launchModals show skills
  const sendDataEmployee = async (employeedata) => {
    const response =  await getSkillsByEmployeeId(employeedata);
    console.log(response)
    setEmployee(response)
    setskillsbyemployee(response.skills)
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

  return (
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
                  <td> {employee.doj.slice(0, 9)} </td>
                  <td> {employee.designation} </td>
                  <td> {employee.email} </td>
                  <td>

                      {/* Pass Employee to modal */}
                    <Button color="info" size="sm" onClick={ () => sendDataEmployee(employee) }>View Skills</Button> {' '}
                    <Button color="warning" size="sm" onClick={ () => getDataToLaunchAddSkillModal(employee)}>Assign Skills</Button> {' '}
                    <Button color="success" size="sm" onClick={ () => getDataTolaunchModalEditEmployee(employee)}>Edit</Button>{' '}
                    <Button color="danger" size="sm" onClick={ () => deleteEmployee(employee.id) }>Delete</Button>
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
      
  )
}

export default ManageEmployeesPage