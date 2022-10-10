import React, {useEffect, useState} from 'react';
import './ManageEmployeePage.scss';
import { Container, Row} from 'reactstrap';
import { Button, FormGroup, Input} from 'reactstrap';
import ModalEmployeeSkills from '../Modals/ModalEmployeeSkills.jsx';
import ModalAddEmployee from '../Modals/ModalAddEmployee.jsx';
import ModalAssignSkill from '../Modals/ModalAssignSkill.jsx';
import ModalEditEmployee from '../Modals/ModalEditEmployee.jsx';
import UnAuthorized from '../unAuthorized/unAuthorizedComponent.jsx'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmployeeRedux, resetDeleteState } from '../../features/employees/employeesSlice'
import { deleteSkillsOfEmployeesByEmployeeId } from '../../features/skillsofEmployees/skillsofEmployeesSlice'
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
const ManageEmployeesPage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })

  //UseSetates to handle the Modals
  const [showModalskills, setShowModalskills] = useState(false)
  const [showModalEditEmployee, setshowModalEditEmployee] = useState(false)
  const [showModalAddEmployee, setshowModalAddEmployee] = useState(false)
  const [showModalAddskills, setshowModalAddskills] = useState(false)

  const [skillsbyemployee, setskillsbyemployee] = useState([])
  //const [ employees, setEmployees ] = useState( [] )
  const [employeeWithskill, setEmployee] = useState([])
    ///////////////////  REDUX TOOLKIT //////////////////////////
  const { isSuccess} = useSelector((state) => state.auth)
  const employeesState  = useSelector((state) => state.employeesState)
  const  {employees}  = employeesState;
  const dispatch = useDispatch()
  const skillssState  = useSelector((state) => state.skillsState)
  const  {skills}  = skillssState;
  const levelsState  = useSelector((state) => state.levelsState)
  const  {levels, getLevelsStatus}  = levelsState;  
  const { admin } = useSelector((state) => state.auth)
  const skillEmployeesStatus = useSelector((state) => state.skillsOfEmployeesState)
  const {skillsOfEmployees, getskillOfEmployeesStatus} = skillEmployeesStatus 

  const token = JSON.parse(localStorage.getItem('token'))
  useEffect ( () => {
    if (isSuccess){
 
    }
  }, [isSuccess, token])

  const deleteEmployee = async (employee, token) => {

    await Swal.fire({
      text: `Are you sure you want to delete the employee:  ${employee.firstName + " "+employee.lastName}?`,
      icon: 'question',
      confirmButtonColor: "#D32F2F",
      showCancelButton: true,
      showCloseButton: true,
      position: "top"
    }).then(async res => {
      if (res.isConfirmed){
        try {
          await dispatch(deleteEmployeeRedux(employee.id)).unwrap()
          dispatch(resetDeleteState())
          dispatch(deleteSkillsOfEmployeesByEmployeeId(employee.id))
          await Toast.fire({
            title: `Employee ${employee.firstName + " "+employee.lastName} deleted`,
            icon: 'success',
            timer: 1500,
            position: "top"
          })
        } catch(error) {
          await Toast.fire({
            title: `Error deleting employee ${error}`,
            icon: 'error',
            timer: 1500,
            position: "top"
          })
        }       
      }
    })

  } 

    //Functions to launchModals show skills
  const sendDataEmployee = async (employeedata, token) => {
    const filterSkillsOfEmployees = skillsOfEmployees.filter((skillemployee) => skillemployee.employeeId === employeedata.id)
    if (filterSkillsOfEmployees.length === 0){
      setskillsbyemployee([])
    } else {
      setskillsbyemployee(filterSkillsOfEmployees)
    }
    setskillsbyemployee(filterSkillsOfEmployees)
    setEmployee(employeedata)
    setShowModalskills(true)
  }

  //Function to launch Add employee modal
  const geDataToLaunchModal = () => {
    setshowModalAddEmployee(true)
  }

  //Function to launch Addskills modal
  const getDataToLaunchAddSkillModal = (employeedata) => {
    setshowModalAddskills(true)
    setEmployee(employeedata)
  }

  //Function to launch edit Employee Modal
  const getDataTolaunchModalEditEmployee = (employeeData) => {
    setshowModalEditEmployee(true)
    //employeeData.doj = employeeData.doj.slice(0, 10);
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
          <Input className='AddEmployee' type="select" id="exampleSelect" onClick={ () => geDataToLaunchModal()} disabled={ admin ? false : true }>
            <option>Click to Add Employee</option>
          </Input>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Table responsive className='table table-striped' bordered='true' size="sm">
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
                    <Button color="warning" size="sm" onClick={ () => getDataToLaunchAddSkillModal(employee)} disabled={ admin ? false : true }>Assign Skills</Button> {' '}
                    <Button color="success" size="sm" onClick={ () => getDataTolaunchModalEditEmployee(employee)} disabled={ admin ? false : true }>Edit</Button>{' '}
                    <Button color="danger" size="sm" onClick={ () => deleteEmployee(employee, token) } disabled={ admin ? false : true }>Delete</Button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        </FormGroup>
      </Row>
      {showModalAddskills ? (
        <ModalAssignSkill
          employee = {employeeWithskill}
          showModalAddskills = {showModalAddskills}
          setshowModalAddskills = { setshowModalAddskills }
          expertises = {levels}      
          skills = {skills}
        /> 
      ) : (
        <></>
      )}

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
        // getAllEmployees = {getAllEmployees}
       /> 
 
       <ModalEditEmployee
       showModalEditEmployee = {showModalEditEmployee}
       setshowModalEditEmployee = {setshowModalEditEmployee}
       employeeWithSkills	 = {employeeWithskill}
      //  getAllEmployees = {getAllEmployees}
       />
       
    </Container>
    ) : (
      <UnAuthorized/>
    )}</motion.div>
  )
}

export default ManageEmployeesPage